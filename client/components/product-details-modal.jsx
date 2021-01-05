import React from 'react';
import Carousel from './carousel';

export default class ProductDetailsModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      product: {},
      quantity: 1
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleCartClick = this.handleCartClick.bind(this);
    this.subtractQuantity = this.subtractQuantity.bind(this);
    this.addQuantity = this.addQuantity.bind(this);
    this.handleQuantityChange = this.handleQuantityChange.bind(this);
    this.styleProductDescription = this.styleProductDescription.bind(this);
    this.styleProductIcons = this.styleProductIcons.bind(this);
  }

  componentDidMount() {
    this.setState({ open: this.props.showModal, product: this.props.product });
  }

  handleClose() {
    this.setState({ open: true });
    this.props.closeDetailedModal();
  }

  handleCartClick() {
    this.props.addToCart(this.state.product, this.state.quantity);
    this.handleClose();
  }

  addQuantity(event) {
    this.setState({ quantity: this.state.quantity + 1 });
  }

  handleQuantityChange(event) {
    if (event.target.value >= 1) { this.setState({ quantity: event.target.value }); }
  }

  subtractQuantity(event) {
    if (this.state.quantity > 1) { this.setState({ quantity: this.state.quantity - 1 }); }
  }

  styleProductDescription(description) {
    return description.split('\n').map((str, i) => <p key={i}>{str.substring(0, str.length - 2)}</p>);
  }

  styleProductIcons(iconImgList, iconDescriptions) {
    const iconDescriptionArray = iconDescriptions.split(',').map(description => description);
    return iconImgList.split(',').map((icon, i) =>
      <div key={i} className="d-flex mb-2">
        <object type="image/svg+xml" data={icon} alt="icon for materials and description" className="icon img-thumbnail">Your browser does not support SVG</object>
        <span className="ml-2 align-self-center">{iconDescriptionArray[i]}</span>
      </div>);
  }

  render() {
    const display = this.state.open ? 'd-block' : 'd-none';
    const { name, imgList, price } = this.props.product;
    const longDescription = this.styleProductDescription(this.props.product.longDescription);
    const iconImg = this.styleProductIcons(this.props.product.iconImg, this.props.product.iconDescription);
    const { quantity } = this.state;
    return (
      <div
        className={`product-detail-modal modal ${display}`}
        tabIndex="1"
        role="dialog"
        aria-labelledby="detailedModal">
        <div
          className="modal-dialog modal-dialog-centered modal-xl"
          role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">{name}</h5>
              <button
                type="button"
                className="close"
                data-dismiss="modal"
                aria-label="Close"
                onClick={this.handleClose}>
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body d-none d-lg-block">
              <div className="row m-2">
                <Carousel
                  imgList={imgList}
                  width="col-6"
                  alt="..." />
                <div className="d-flex flex-column justify-content-between col-6">
                  <div className="mb-3">{longDescription}</div>
                  <div className="mb-5 ml-5">{iconImg}</div>
                  <div>
                    <div className="d-flex justify-content-end align-items-end">
                      <h5 className="text-muted p-0 m-0 mt-auto">
                        {`$${parseInt(price / 100)}.${price % 100} / item`}
                      </h5>
                    </div>
                    <div className="d-flex justify-content-between align-items-end">
                      <form>
                        <div className="col-auto">
                          <div className="input-group">
                            <div className="input-group-prepend">
                              <button type="button" className="btn minus input-group-text" onClick={this.subtractQuantity}>-</button>
                            </div>
                            <input type="text" value={quantity} onChange={this.handleQuantityChange} className="form-control col-3 text-center" id="inlineFormInputGroup" placeholder="1"/>
                            <div className="input-group-append">
                              <button type="button" className="btn plus input-group-text" onClick={this.addQuantity}>+</button>
                            </div>
                          </div>
                        </div>
                      </form>
                      <h5 className="text-muted p-0 m-0 mt-auto">
                        {`$${parseInt(price * quantity / 100)}.${price * quantity % 100}`}
                      </h5>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-body d-lg-none">
              <div className="row m-2">
                <Carousel
                  width="col-12"
                  imgList={imgList}
                  alt="..." />
                <div className="d-flex flex-column justify-content-between col-12 mt-5">
                  <div className="mb-3">{longDescription}</div>
                  <div className="mb-5 ml-5">{iconImg}</div>
                  <div className="d-flex justify-content-end align-items-end">
                    <h5 className="text-muted p-0 m-0 mt-auto">
                      {`$${parseInt(price / 100)}.${price % 100} / item`}
                    </h5>
                  </div>
                  <div className="d-flex justify-content-between align-items-end">
                    <form>
                      <div className="col-auto">
                        <div className="input-group">
                          <div className="input-group-prepend">
                            <button type="button" className="btn minus input-group-text" onClick={this.subtractQuantity}>-</button>
                          </div>
                          <input type="text" value={quantity} onChange={this.handleQuantityChange} className="form-control col-3 text-center" id="inlineFormInputGroup" placeholder="1" />
                          <div className="input-group-append">
                            <button type="button" className="btn plus input-group-text" onClick={this.addQuantity}>+</button>
                          </div>
                        </div>
                      </div>
                    </form>
                    <h5 className="text-muted p-0 m-0 mt-auto">
                      {`$${parseInt(price * quantity / 100)}.${price * quantity % 100}`}
                    </h5>
                  </div>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleCartClick}>
                  Add to cart
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.handleClose}>
                  Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

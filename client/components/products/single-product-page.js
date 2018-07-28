import React, {Component} from 'react'
import {fetchProduct, postCart, fetchCart} from '../../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Image,
  Button,
  Grid,
  Header,
  Segment,
  Label,
  Icon
} from 'semantic-ui-react'
import ReviewPage from '../reviews/review-page'

const mapState = state => ({
  product: state.product,
  user: state.user,
  cart: state.cart
})

const mapDispatch = dispatch => {
  return {
    getProduct: id => dispatch(fetchProduct(id)),
    addToCart: input => dispatch(postCart(input)),
    getCart: id => dispatch(fetchCart(id))
  }
}

class SingleProductPage extends Component {
  componentDidMount() {
    const {getProduct} = this.props
    const id = Number(this.props.match.params.id)
    getProduct(id)
  }

  addToCartSubmit(productId, userId) {
    const {addToCart, user} = this.props
    addToCart({productId, userId: userId})
    fetchCart(user.id)
  }

  render() {
    const {product, user} = this.props
    const id = Number(this.props.match.params.id)

    return (
      <div>
        <div
          className="ui raised very padded text container segment"
          style={styles.div}
        >
          <Grid divided="vertically">
            <Grid.Row columns={2}>
              <Grid.Column>
                <Image src={product.imageUrl} size="medium" />
              </Grid.Column>
              <Grid.Column>
                <Header as="h2">{product.name}</Header>
                <Label.Group>
                  <Label as="a" size="large" tag>
                    {'$' + product.price}
                  </Label>
                  {user.isAdmin ? (
                    <Button
                      as={Link}
                      to={`/admin/products/edit/${product.id}`}
                      style={styles.button}
                      size="small"
                    >
                      <Icon name="edit" /> Edit
                    </Button>
                  ) : (
                    ''
                  )}
                </Label.Group>

                <Segment>{product.description}</Segment>
                <Button as="div" labelPosition="right">
                  <Button
                    color="red"
                    onClick={() => this.addToCartSubmit(product.id, user.id)}
                  >
                    <Icon name="shop" />Add to Cart
                  </Button>
                  <Label as="a" basic color="red" pointing="left">
                    Only {product.inventory} left!
                  </Label>
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
        <ReviewPage productId={id} />
      </div>
    )
  }
}

const styles = {
  div: {
    marginTop: 40
  },
  button: {
    marginLeft: 5
  }
}

export default connect(mapState, mapDispatch)(SingleProductPage)

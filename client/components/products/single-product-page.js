import React, {Component} from 'react'
import {fetchProduct} from '../../store'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {
  Image,
  List,
  Container,
  Button,
  Grid,
  Header,
  Segment
} from 'semantic-ui-react'

class SingleProductPage extends Component {
  componentDidMount() {
    const id = Number(this.props.match.params.id)
    this.props.fetchProduct(id)
  }

  render() {
    const {product, user} = this.props

    return (
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
              <Segment>{'Price: $' + product.price}</Segment>
              <Segment>{product.description}</Segment>
              <Button basic color="red">
                Add to Cart
              </Button>
              {user.isAdmin ? (
                <Button basic color="blue">
                  <Link to={`/admin/products/edit/${product.id}`}>
                    Edit Product
                  </Link>
                </Button>
              ) : (
                ''
              )}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </div>
    )
  }
}

const mapState = state => ({
  product: state.product,
  user: state.user
})

const mapDispatch = dispatch => {
  return {
    fetchProduct: id => dispatch(fetchProduct(id))
  }
}

const styles = {
  div: {
    marginTop: 40
  }
}

export default connect(mapState, mapDispatch)(SingleProductPage)

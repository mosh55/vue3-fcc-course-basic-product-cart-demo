  <template>
  <nav>
    <header class="top-bar spread">
      <nav class="top-bar-nav">
        <router-link to="/" class="top-bar-link">
          <i class="icofont-spoon-and-fork"></i>
          <span>Home</span>
        </router-link>
        <router-link to="/products" class="top-bar-link">
          <span>Products</span>
        </router-link>
        <router-link to="/past-orders" class="top-bar-link">
          <span>Past Orders</span>
        </router-link>
      </nav>
      <div href="#" class="top-bar-cart-link" @click="toggleSidebar">
        <i class="icofont-cart-alt icofont-1x"></i>
        <span>Cart ({{ totalQuantity }})</span>
      </div>
    </header>
  </nav>
  <router-view :inventory="inventory" :addToCart="addToCart" />
  <Sidebar
    :cart="cart"
    v-if="showSidebar"
    :toggle="toggleSidebar"
    :inventory="inventory"
    :remove="removeItem"
  />
</template>

<script>
import Sidebar from '@/components/Sidebar.vue' // @/: src/
import food from './food.json'

export default {
  components: {
    Sidebar
  },
  data () {
    return {
      showSidebar: false,
      inventory: food,
      cart: {}
    }
  },
  computed: {
    totalQuantity () {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr
      }, 0)
    }
  },
  methods: {
    removeItem (name) {
      // console.log(this.cart)
      delete this.cart[name]
      // console.log(this.cart)
    },
    addToCart (name, quantity) {
      if (!this.cart[name]) this.cart[name] = 0
      this.cart[name] += quantity
      // console.log(this.cart);
    },
    toggleSidebar () {
      this.showSidebar = !this.showSidebar
    }

  }
}
</script>

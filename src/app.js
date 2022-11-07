let app=  Vue.createApp({
  data() {
    return {
      showSidebar: false,
      inventory: [],
      cart: {},
    }
  },
  computed: {
    totalQuantity() {
      return Object.values(this.cart).reduce((acc, curr) => {
        return acc + curr;
      }, 0);

    },
  },
  methods: {
    removeItem(name) {
      // console.log(this.cart)
      delete this.cart[name];
      // console.log(this.cart)
    },
    addToCart(name, index){
      //i think there is a something interesting here.
      if(!this.cart[name]) this.cart[name] = 0;
      this.cart[name] += this.inventory[index].quantity;
      this.inventory[index].quantity = 0;
      // console.log(this.cart);
    },
    toggleSidebar(){
      this.showSidebar = !this.showSidebar;
    }

  },
  // use life cycle hooks and get data from food.json
  async mounted(){
    const response= await fetch("./food.json");
    const data= await response.json();
    this.inventory = data;
  },


});

app.component('sidebar',{
  props: ['toggle', 'cart', 'inventory', 'remove'],
  methods: {
    getPrice(name){
      const product = this.inventory.find((p) => {
        return p.name === name;
      });
      return product.price.USD;
    },
    calculateTotal() {
      const total = Object.entries(this.cart).reduce((acc, curr, index) => {
        return acc + (curr[1] * this.getPrice(curr[0]));
      }, 0);
      return total.toFixed(2);
    }
  },
  template: `
    <aside class="cart-container">
      <div class="cart">
        <h1 class="cart-title spread">
          <span>
            Cart
            <i class="icofont-cart-alt icofont-1x"></i>
          </span>
          <button class="cart-close" @click="toggle">&times;</button>
        </h1>

        <div class="cart-body">
          <table class="cart-table">
            <thead>
              <tr>
                <th><span class="sr-only">Product Image</span></th>
                <th>Product</th>
                <th>Price</th>
                <th>Qty</th>
                <th>Total</th>
                <th><span class="sr-only">Actions</span></th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(quantity, key, i) in cart" :key="i" >
                <td><i class="icofont-carrot icofont-3x"></i></td>
                <td>{{ key }}</td>
                <td>\${{ getPrice(key) }}</td>
                <td class="center">{{ quantity }}</td>
                <td>\${{(getPrice(key) * quantity).toFixed(2)}}</td>
                <td class="center">
                  <button @click="remove(key)" class="btn btn-light cart-remove">
                    &times;
                  </button>
                </td>
              </tr>
            </tbody>
          </table>

          <p class="center" v-if="!Object.keys(cart).length" ><em>No items in cart</em></p>
          <div class="spread">
            <span><strong>Total:</strong> \${{calculateTotal()}}</span>
            <button  class="btn btn-light">Checkout</button>
          </div>
        </div>
      </div>
    </aside>
  `
})

app.mount("#app");

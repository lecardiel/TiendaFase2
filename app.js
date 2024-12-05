new Vue({
  el: "#app",
  data: {
    meals: [],
    categories: [],
    searchQuery: "",
    selectedCategory: "",
    selectedMeals: [],
    isDetailPage: false,
    currentMeal: null,
    quantity: 1,
  },
  computed: {
    filteredMeals() {
      return this.meals.filter(
        (meal) =>
          (!this.selectedCategory ||
            meal.strCategory === this.selectedCategory) &&
          meal.strMeal.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
    progressPercentage() {
      return (this.selectedMeals.length / this.meals.length) * 100;
    },
  },
  methods: {
    fetchMeals() {
      axios
        .get("https://www.themealdb.com/api/json/v1/1/search.php?s=")
        .then((response) => {
          this.meals = response.data.meals;
        });
    },
    fetchCategories() {
      axios
        .get("https://www.themealdb.com/api/json/v1/1/list.php?c=list")
        .then((response) => {
          this.categories = response.data.meals.map((cat) => cat.strCategory);
        });
    },
    addMeal(meal) {
      if (!this.selectedMeals.includes(meal)) {
        this.selectedMeals.push(meal);
      }
    },
    viewDetails(meal) {
      this.currentMeal = meal;
      this.isDetailPage = true;
      this.quantity = 1; // Reinicia la cantidad al abrir el detalle
    },
    goBack() {
      this.isDetailPage = false;
    },
    incrementQuantity() {
      if (this.quantity < 6) {
        this.quantity++;
      }
    },
    decrementQuantity() {
      if (this.quantity > 1) {
        this.quantity--;
      }
    },
  },
  mounted() {
    this.fetchMeals();
    this.fetchCategories();
  },
});

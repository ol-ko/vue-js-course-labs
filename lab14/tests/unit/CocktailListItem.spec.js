import { shallowMount } from '@vue/test-utils'
import CocktailListItem from '@/components/CocktailListItem.vue'

const testCocktail = {
  id: "TestCocktailId",
  title: "Test cocktail title",
  description: "Test cocktail description",
  imageUrl: "https://test-cocktail-image.jpg"
};

describe('CocktailListItem.vue', () => {
  it('renders cocktail data', () => {
    const wrapper = shallowMount(CocktailListItem, {
      propsData: {
        cocktail: testCocktail
      },
      stubs: ['router-link']
    });
    expect(wrapper.text()).toContain(testCocktail.title);
    expect(wrapper.text()).toContain(testCocktail.description);
  });
});

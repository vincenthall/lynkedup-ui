import { mount } from '@vue/test-utils'
import RegistrationForm from '@/components/RegistrationForm.vue'

describe('Logo', () => {
  test('is a Vue instance', () => {
    const wrapper = mount(RegistrationForm)
    expect(wrapper.isVueInstance()).toBeTruthy()
  })
})

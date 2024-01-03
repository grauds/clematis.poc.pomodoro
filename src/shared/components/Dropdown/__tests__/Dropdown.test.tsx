import React from "react"
import { Dropdown } from "../Dropdown"
import { shallow } from 'enzyme'

describe('Dropdown', () => {
    test('should render', () => {
        const wrapper = shallow(<Dropdown children={<div />} button={<button/>} />)
        expect(wrapper).toBeDefined();
        console.log(wrapper.find('div.container').debug())
        expect(wrapper.find('div.container').isEmptyRender()).toBeFalsy();
    })

    test('should render (snapshot)', () => {
        const wrapper = shallow(<Dropdown children={<div />} button={<button/>} />)
        expect(wrapper).toMatchSnapshot();
    })
})
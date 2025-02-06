import React from 'react';
import { Dropdown } from '../Dropdown';
import { render } from '@testing-library/react';
import { screen } from '@testing-library/dom'

describe('Dropdown', () => {
  test('should render', () => {
    const {container} = render(
      <Dropdown button={<button />}>
        <div />
      </Dropdown>,
    );
    expect(screen).toBeDefined();
    console.log(container.querySelector('div.container'));
    expect(container.querySelector('div.container')).toBeTruthy();
    expect(container.querySelector('div.container')).toMatchSnapshot();
  });

});

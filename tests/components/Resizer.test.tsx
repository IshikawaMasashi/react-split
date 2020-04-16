import React from 'react';
import { shallow } from 'enzyme';

import Resizer from '../../src/components/Resizer';
// import { styles } from "../../src/utils/styles";
import { SplitOrientation } from '../../src/components/Split';

describe('Resizer.test', () => {
  it('Horizontal class test', () => {
    const component = shallow(
      <Resizer
        orientation={SplitOrientation.Horizontal}
        onMouseDown={event => {}}
      />
    );

    // expect(
    //   component.contains(
    //     <div className={"resizer horizontal"} onMouseDown={event => {}} />
    //   )
    // ).toBe(true);
    expect(component.hasClass('horizontal')).toBe(true);
  });
});

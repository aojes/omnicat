// import React from 'react';
// import { TableC } from '../../src/tablec';
// import { mountWrap, shallowWrap } from '../testhelp/ContextWrap';
// import { expectedProps } from './mockdata'
//
// describe('Table', () => {
//   let props;
//   let component;
//   const wrappedShallow = () => shallowWrap(<TableC {...props} />);
//
//   const wrappedMount = () => mountWrap(<TableC {...props} />);
//
//   beforeEach(() => {
//     props = {
//       query: {
//         data: groupData,
//         refetch: jest.fn(),
//       },
//     };
//     if (component) component.unmount();
//   });
//
//   test('should render with mock group data in snapshot', () => {
//     const wrapper = wrappedShallow();
//     expect(wrapper).toMatchSnapshot();
//   });
//
//   test('should call a DeepTable with correct props', () => {
//     const wrapper = wrappedMount();
//     expect(wrapper.find('DeepTable').props()).toEqual(expectedProps);
//   });
//
// });

import { getParser, GetElementsArgsType, NavigateOnPageArgsType } from '../common/createParser';

import { selectorGroup } from './selectorGroup';


type ElementType = string;

const getElements = ({ $, selectorGroup }: GetElementsArgsType): ElementType[] => {
  return ['', $.toString(), selectorGroup.toString()];
};

const forEachElement = (element: ElementType) => {
  console.log(element);
};

const navigateOnPage = ({ page, selectorGroup }: NavigateOnPageArgsType) => {
  console.log(page, selectorGroup);
  return Promise.resolve(undefined);
};

export const farfetchParser = getParser<ElementType>({
  getElements,
  selectorGroup,
  forEachElement,
  navigateOnPage,
});

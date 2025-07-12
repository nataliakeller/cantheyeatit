import { createVNode, normalizeStyle, normalizeClass } from 'vue';
import { l as useDimension, a as useRender, w as makeTagProps, z as makeDimensionProps, h as makeComponentProps } from './index-CV-ig810.mjs';
import { d as genericComponent, p as propsFactory, v as useRtl } from './server.mjs';

const makeVContainerProps = propsFactory({
  fluid: {
    type: Boolean,
    default: false
  },
  ...makeComponentProps(),
  ...makeDimensionProps(),
  ...makeTagProps()
}, "VContainer");
const VContainer = genericComponent()({
  name: "VContainer",
  props: makeVContainerProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      rtlClasses
    } = useRtl();
    const {
      dimensionStyles
    } = useDimension(props);
    useRender(() => createVNode(props.tag, {
      "class": normalizeClass(["v-container", {
        "v-container--fluid": props.fluid
      }, rtlClasses.value, props.class]),
      "style": normalizeStyle([dimensionStyles.value, props.style])
    }, slots));
    return {};
  }
});

export { VContainer as V };
//# sourceMappingURL=VContainer-CAjm2g5h.mjs.map

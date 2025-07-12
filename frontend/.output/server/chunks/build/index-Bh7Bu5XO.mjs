import { ref, mergeProps, withCtx, unref, createTextVNode, toDisplayString, createVNode, createBlock, openBlock, Fragment, renderList, createCommentVNode, computed, h, capitalize, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
import { V as VCard, a as VCardTitle, g as VCardSubtitle, b as VCardText, d as VChip, c as VCardActions, u as useApi } from './VCard-CEDBZ-Ln.mjs';
import { V as VContainer } from './VContainer-CAjm2g5h.mjs';
import { V as VAlert } from './VAlert-DbRy8BhV.mjs';
import { d as VBtn, w as makeTagProps, h as makeComponentProps } from './index-CV-ig810.mjs';
import { d as genericComponent, p as propsFactory, ac as breakpoints } from './server.mjs';
import '../_/nitro.mjs';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/utils';
import 'unhead/plugins';
import 'vue-router';

const breakpointProps = (() => {
  return breakpoints.reduce((props, val) => {
    props[val] = {
      type: [Boolean, String, Number],
      default: false
    };
    return props;
  }, {});
})();
const offsetProps = (() => {
  return breakpoints.reduce((props, val) => {
    const offsetKey = "offset" + capitalize(val);
    props[offsetKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const orderProps = (() => {
  return breakpoints.reduce((props, val) => {
    const orderKey = "order" + capitalize(val);
    props[orderKey] = {
      type: [String, Number],
      default: null
    };
    return props;
  }, {});
})();
const propMap$1 = {
  col: Object.keys(breakpointProps),
  offset: Object.keys(offsetProps),
  order: Object.keys(orderProps)
};
function breakpointClass$1(type, prop, val) {
  let className = type;
  if (val == null || val === false) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  if (type === "col") {
    className = "v-" + className;
  }
  if (type === "col" && (val === "" || val === true)) {
    return className.toLowerCase();
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const ALIGN_SELF_VALUES = ["auto", "start", "end", "center", "baseline", "stretch"];
const makeVColProps = propsFactory({
  cols: {
    type: [Boolean, String, Number],
    default: false
  },
  ...breakpointProps,
  offset: {
    type: [String, Number],
    default: null
  },
  ...offsetProps,
  order: {
    type: [String, Number],
    default: null
  },
  ...orderProps,
  alignSelf: {
    type: String,
    default: null,
    validator: (str) => ALIGN_SELF_VALUES.includes(str)
  },
  ...makeComponentProps(),
  ...makeTagProps()
}, "VCol");
const VCol = genericComponent()({
  name: "VCol",
  props: makeVColProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap$1) {
        propMap$1[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass$1(type, prop, value);
          if (className) classList.push(className);
        });
      }
      const hasColClasses = classList.some((className) => className.startsWith("v-col-"));
      classList.push({
        // Default to .v-col if no other col-{bp}-* classes generated nor `cols` specified.
        "v-col": !hasColClasses || !props.cols,
        [`v-col-${props.cols}`]: props.cols,
        [`offset-${props.offset}`]: props.offset,
        [`order-${props.order}`]: props.order,
        [`align-self-${props.alignSelf}`]: props.alignSelf
      });
      return classList;
    });
    return () => {
      var _a;
      return h(props.tag, {
        class: [classes.value, props.class],
        style: props.style
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const ALIGNMENT = ["start", "end", "center"];
const SPACE = ["space-between", "space-around", "space-evenly"];
function makeRowProps(prefix, def) {
  return breakpoints.reduce((props, val) => {
    const prefixKey = prefix + capitalize(val);
    props[prefixKey] = def();
    return props;
  }, {});
}
const ALIGN_VALUES = [...ALIGNMENT, "baseline", "stretch"];
const alignValidator = (str) => ALIGN_VALUES.includes(str);
const alignProps = makeRowProps("align", () => ({
  type: String,
  default: null,
  validator: alignValidator
}));
const JUSTIFY_VALUES = [...ALIGNMENT, ...SPACE];
const justifyValidator = (str) => JUSTIFY_VALUES.includes(str);
const justifyProps = makeRowProps("justify", () => ({
  type: String,
  default: null,
  validator: justifyValidator
}));
const ALIGN_CONTENT_VALUES = [...ALIGNMENT, ...SPACE, "stretch"];
const alignContentValidator = (str) => ALIGN_CONTENT_VALUES.includes(str);
const alignContentProps = makeRowProps("alignContent", () => ({
  type: String,
  default: null,
  validator: alignContentValidator
}));
const propMap = {
  align: Object.keys(alignProps),
  justify: Object.keys(justifyProps),
  alignContent: Object.keys(alignContentProps)
};
const classMap = {
  align: "align",
  justify: "justify",
  alignContent: "align-content"
};
function breakpointClass(type, prop, val) {
  let className = classMap[type];
  if (val == null) {
    return void 0;
  }
  if (prop) {
    const breakpoint = prop.replace(type, "");
    className += `-${breakpoint}`;
  }
  className += `-${val}`;
  return className.toLowerCase();
}
const makeVRowProps = propsFactory({
  dense: Boolean,
  noGutters: Boolean,
  align: {
    type: String,
    default: null,
    validator: alignValidator
  },
  ...alignProps,
  justify: {
    type: String,
    default: null,
    validator: justifyValidator
  },
  ...justifyProps,
  alignContent: {
    type: String,
    default: null,
    validator: alignContentValidator
  },
  ...alignContentProps,
  ...makeComponentProps(),
  ...makeTagProps()
}, "VRow");
const VRow = genericComponent()({
  name: "VRow",
  props: makeVRowProps(),
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const classes = computed(() => {
      const classList = [];
      let type;
      for (type in propMap) {
        propMap[type].forEach((prop) => {
          const value = props[prop];
          const className = breakpointClass(type, prop, value);
          if (className) classList.push(className);
        });
      }
      classList.push({
        "v-row--no-gutters": props.noGutters,
        "v-row--dense": props.dense,
        [`align-${props.align}`]: props.align,
        [`justify-${props.justify}`]: props.justify,
        [`align-content-${props.alignContent}`]: props.alignContent
      });
      return classList;
    });
    return () => {
      var _a;
      return h(props.tag, {
        class: ["v-row", classes.value, props.class],
        style: props.style
      }, (_a = slots.default) == null ? void 0 : _a.call(slots));
    };
  }
});
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { foods: foodsApi } = useApi();
    const foods = ref([]);
    const error = ref("");
    const quantityList = [
      { value: "free", label: "Freely" },
      { value: "moderate", label: "In moderation" },
      { value: "rarely", label: "Rarely" },
      { value: "never", label: "Never" }
    ];
    const getQuantityLabel = (value) => {
      const found = quantityList.find((q) => q.value === value);
      return found ? found.label : "Unknown";
    };
    const getQuantityColor = (value) => {
      switch (value) {
        case "free":
          return "success";
        case "moderate":
          return "warning";
        case "rarely":
          return "deep-orange";
        case "never":
          return "error";
        default:
          return "grey";
      }
    };
    const deleteFood = async (id) => {
      if (!confirm("Are you sure you want to delete this item?")) return;
      try {
        await foodsApi.delete(id);
        foods.value = foods.value.filter((food) => food.id !== id);
      } catch (err) {
        console.error(err);
        error.value = "Failed to delete food item.";
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, mergeProps({ fluid: "" }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (unref(error)) {
              _push2(ssrRenderComponent(VAlert, {
                type: "error",
                class: "mb-4",
                text: unref(error)
              }, null, _parent2, _scopeId));
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(VRow, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`<!--[-->`);
                  ssrRenderList(unref(foods), (food) => {
                    _push3(ssrRenderComponent(VCol, {
                      key: food.id,
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCard, { class: "h-100" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VCardTitle, { class: "text-h6" }, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(food.name)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(food.name), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardSubtitle, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(`${ssrInterpolate(food.description)}`);
                                    } else {
                                      return [
                                        createTextVNode(toDisplayString(food.description), 1)
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardText, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VChip, {
                                        class: "ma-1",
                                        color: food.can_eat ? "success" : "error",
                                        variant: "elevated"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(food.can_eat ? "They can eat this" : "Not recommended")}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(food.can_eat ? "They can eat this" : "Not recommended"), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VChip, {
                                        class: "ma-1",
                                        color: getQuantityColor(food.quantity),
                                        variant: "outlined"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(`${ssrInterpolate(getQuantityLabel(food.quantity))}`);
                                          } else {
                                            return [
                                              createTextVNode(toDisplayString(getQuantityLabel(food.quantity)), 1)
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VChip, {
                                          class: "ma-1",
                                          color: food.can_eat ? "success" : "error",
                                          variant: "elevated"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(food.can_eat ? "They can eat this" : "Not recommended"), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["color"]),
                                        createVNode(VChip, {
                                          class: "ma-1",
                                          color: getQuantityColor(food.quantity),
                                          variant: "outlined"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(toDisplayString(getQuantityLabel(food.quantity)), 1)
                                          ]),
                                          _: 2
                                        }, 1032, ["color"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VCardActions, null, {
                                  default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                    if (_push6) {
                                      _push6(ssrRenderComponent(VBtn, {
                                        to: `/food/${food.id}?view`,
                                        color: "primary",
                                        variant: "text"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` View Details `);
                                          } else {
                                            return [
                                              createTextVNode(" View Details ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        to: `/food/${food.id}?edit`,
                                        color: "secondary",
                                        variant: "text"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Edit `);
                                          } else {
                                            return [
                                              createTextVNode(" Edit ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                      _push6(ssrRenderComponent(VBtn, {
                                        onClick: ($event) => deleteFood(food.id),
                                        color: "error",
                                        variant: "text"
                                      }, {
                                        default: withCtx((_6, _push7, _parent7, _scopeId6) => {
                                          if (_push7) {
                                            _push7(` Delete `);
                                          } else {
                                            return [
                                              createTextVNode(" Delete ")
                                            ];
                                          }
                                        }),
                                        _: 2
                                      }, _parent6, _scopeId5));
                                    } else {
                                      return [
                                        createVNode(VBtn, {
                                          to: `/food/${food.id}?view`,
                                          color: "primary",
                                          variant: "text"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" View Details ")
                                          ]),
                                          _: 2
                                        }, 1032, ["to"]),
                                        createVNode(VBtn, {
                                          to: `/food/${food.id}?edit`,
                                          color: "secondary",
                                          variant: "text"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Edit ")
                                          ]),
                                          _: 2
                                        }, 1032, ["to"]),
                                        createVNode(VBtn, {
                                          onClick: ($event) => deleteFood(food.id),
                                          color: "error",
                                          variant: "text"
                                        }, {
                                          default: withCtx(() => [
                                            createTextVNode(" Delete ")
                                          ]),
                                          _: 2
                                        }, 1032, ["onClick"])
                                      ];
                                    }
                                  }),
                                  _: 2
                                }, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VCardTitle, { class: "text-h6" }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(food.name), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardSubtitle, null, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(food.description), 1)
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardText, null, {
                                    default: withCtx(() => [
                                      createVNode(VChip, {
                                        class: "ma-1",
                                        color: food.can_eat ? "success" : "error",
                                        variant: "elevated"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(food.can_eat ? "They can eat this" : "Not recommended"), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["color"]),
                                      createVNode(VChip, {
                                        class: "ma-1",
                                        color: getQuantityColor(food.quantity),
                                        variant: "outlined"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(getQuantityLabel(food.quantity)), 1)
                                        ]),
                                        _: 2
                                      }, 1032, ["color"])
                                    ]),
                                    _: 2
                                  }, 1024),
                                  createVNode(VCardActions, null, {
                                    default: withCtx(() => [
                                      createVNode(VBtn, {
                                        to: `/food/${food.id}?view`,
                                        color: "primary",
                                        variant: "text"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" View Details ")
                                        ]),
                                        _: 2
                                      }, 1032, ["to"]),
                                      createVNode(VBtn, {
                                        to: `/food/${food.id}?edit`,
                                        color: "secondary",
                                        variant: "text"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Edit ")
                                        ]),
                                        _: 2
                                      }, 1032, ["to"]),
                                      createVNode(VBtn, {
                                        onClick: ($event) => deleteFood(food.id),
                                        color: "error",
                                        variant: "text"
                                      }, {
                                        default: withCtx(() => [
                                          createTextVNode(" Delete ")
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ];
                              }
                            }),
                            _: 2
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCard, { class: "h-100" }, {
                              default: withCtx(() => [
                                createVNode(VCardTitle, { class: "text-h6" }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(food.name), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(VCardSubtitle, null, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(food.description), 1)
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(VCardText, null, {
                                  default: withCtx(() => [
                                    createVNode(VChip, {
                                      class: "ma-1",
                                      color: food.can_eat ? "success" : "error",
                                      variant: "elevated"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(food.can_eat ? "They can eat this" : "Not recommended"), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["color"]),
                                    createVNode(VChip, {
                                      class: "ma-1",
                                      color: getQuantityColor(food.quantity),
                                      variant: "outlined"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(getQuantityLabel(food.quantity)), 1)
                                      ]),
                                      _: 2
                                    }, 1032, ["color"])
                                  ]),
                                  _: 2
                                }, 1024),
                                createVNode(VCardActions, null, {
                                  default: withCtx(() => [
                                    createVNode(VBtn, {
                                      to: `/food/${food.id}?view`,
                                      color: "primary",
                                      variant: "text"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" View Details ")
                                      ]),
                                      _: 2
                                    }, 1032, ["to"]),
                                    createVNode(VBtn, {
                                      to: `/food/${food.id}?edit`,
                                      color: "secondary",
                                      variant: "text"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Edit ")
                                      ]),
                                      _: 2
                                    }, 1032, ["to"]),
                                    createVNode(VBtn, {
                                      onClick: ($event) => deleteFood(food.id),
                                      color: "error",
                                      variant: "text"
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Delete ")
                                      ]),
                                      _: 2
                                    }, 1032, ["onClick"])
                                  ]),
                                  _: 2
                                }, 1024)
                              ]),
                              _: 2
                            }, 1024)
                          ];
                        }
                      }),
                      _: 2
                    }, _parent3, _scopeId2));
                  });
                  _push3(`<!--]-->`);
                } else {
                  return [
                    (openBlock(true), createBlock(Fragment, null, renderList(unref(foods), (food) => {
                      return openBlock(), createBlock(VCol, {
                        key: food.id,
                        cols: "12",
                        sm: "6",
                        md: "4",
                        lg: "3"
                      }, {
                        default: withCtx(() => [
                          createVNode(VCard, { class: "h-100" }, {
                            default: withCtx(() => [
                              createVNode(VCardTitle, { class: "text-h6" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(food.name), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardSubtitle, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(food.description), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardText, null, {
                                default: withCtx(() => [
                                  createVNode(VChip, {
                                    class: "ma-1",
                                    color: food.can_eat ? "success" : "error",
                                    variant: "elevated"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(food.can_eat ? "They can eat this" : "Not recommended"), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["color"]),
                                  createVNode(VChip, {
                                    class: "ma-1",
                                    color: getQuantityColor(food.quantity),
                                    variant: "outlined"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(getQuantityLabel(food.quantity)), 1)
                                    ]),
                                    _: 2
                                  }, 1032, ["color"])
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(VCardActions, null, {
                                default: withCtx(() => [
                                  createVNode(VBtn, {
                                    to: `/food/${food.id}?view`,
                                    color: "primary",
                                    variant: "text"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" View Details ")
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]),
                                  createVNode(VBtn, {
                                    to: `/food/${food.id}?edit`,
                                    color: "secondary",
                                    variant: "text"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Edit ")
                                    ]),
                                    _: 2
                                  }, 1032, ["to"]),
                                  createVNode(VBtn, {
                                    onClick: ($event) => deleteFood(food.id),
                                    color: "error",
                                    variant: "text"
                                  }, {
                                    default: withCtx(() => [
                                      createTextVNode(" Delete ")
                                    ]),
                                    _: 2
                                  }, 1032, ["onClick"])
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        _: 2
                      }, 1024);
                    }), 128))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              unref(error) ? (openBlock(), createBlock(VAlert, {
                key: 0,
                type: "error",
                class: "mb-4",
                text: unref(error)
              }, null, 8, ["text"])) : createCommentVNode("", true),
              createVNode(VRow, null, {
                default: withCtx(() => [
                  (openBlock(true), createBlock(Fragment, null, renderList(unref(foods), (food) => {
                    return openBlock(), createBlock(VCol, {
                      key: food.id,
                      cols: "12",
                      sm: "6",
                      md: "4",
                      lg: "3"
                    }, {
                      default: withCtx(() => [
                        createVNode(VCard, { class: "h-100" }, {
                          default: withCtx(() => [
                            createVNode(VCardTitle, { class: "text-h6" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(food.name), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardSubtitle, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(food.description), 1)
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createVNode(VChip, {
                                  class: "ma-1",
                                  color: food.can_eat ? "success" : "error",
                                  variant: "elevated"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(food.can_eat ? "They can eat this" : "Not recommended"), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color"]),
                                createVNode(VChip, {
                                  class: "ma-1",
                                  color: getQuantityColor(food.quantity),
                                  variant: "outlined"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(toDisplayString(getQuantityLabel(food.quantity)), 1)
                                  ]),
                                  _: 2
                                }, 1032, ["color"])
                              ]),
                              _: 2
                            }, 1024),
                            createVNode(VCardActions, null, {
                              default: withCtx(() => [
                                createVNode(VBtn, {
                                  to: `/food/${food.id}?view`,
                                  color: "primary",
                                  variant: "text"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" View Details ")
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                createVNode(VBtn, {
                                  to: `/food/${food.id}?edit`,
                                  color: "secondary",
                                  variant: "text"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Edit ")
                                  ]),
                                  _: 2
                                }, 1032, ["to"]),
                                createVNode(VBtn, {
                                  onClick: ($event) => deleteFood(food.id),
                                  color: "error",
                                  variant: "text"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Delete ")
                                  ]),
                                  _: 2
                                }, 1032, ["onClick"])
                              ]),
                              _: 2
                            }, 1024)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024);
                  }), 128))
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/food/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Bh7Bu5XO.mjs.map

import { ref, withCtx, createTextVNode, unref, isRef, createVNode, useSSRContext } from 'vue';
import { ssrRenderComponent } from 'vue/server-renderer';
import { useRouter } from 'vue-router';
import { V as VCard, a as VCardTitle, b as VCardText, u as useApi } from './VCard-CEDBZ-Ln.mjs';
import { V as VContainer } from './VContainer-CAjm2g5h.mjs';
import { V as VForm, a as VSwitch } from './VSwitch-C1Kp_jQE.mjs';
import { V as VTextField, j as VSelect } from './VSelect-muYyrUe_.mjs';
import { d as VBtn } from './index-CV-ig810.mjs';
import './server.mjs';
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
import './ssrBoot-ZQn7gOuX.mjs';

const _sfc_main = {
  __name: "new",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const { foods } = useApi();
    const form = ref(null);
    const valid = ref(false);
    const food = ref({
      name: "",
      description: "",
      quantity: null,
      can_eat: true
    });
    const quantityList = [
      { value: "free", label: "Freely" },
      { value: "moderate", label: "In moderation" },
      { value: "rarely", label: "Rarely" },
      { value: "never", label: "Never" }
    ];
    const submitForm = async () => {
      if (form.value.validate()) {
        try {
          const payload = {
            ...food.value,
            can_eat: food.value.can_eat ? 1 : 0
            // convert boolean to numeric
          };
          console.log("Submitting food item:", payload);
          await foods.create(payload);
          router.push("/");
        } catch (error) {
          console.error("Error creating food item:", error);
          alert("Failed to create food item. Please try again.");
        }
      } else {
        alert("Please correct the errors in the form.");
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VContainer, _attrs, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCard, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VCardTitle, { class: "text-h5" }, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(`Add New Food Item`);
                      } else {
                        return [
                          createTextVNode("Add New Food Item")
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        _push4(ssrRenderComponent(VForm, {
                          ref_key: "form",
                          ref: form,
                          modelValue: unref(valid),
                          "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null,
                          "lazy-validation": ""
                        }, {
                          default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                            if (_push5) {
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(food).name,
                                "onUpdate:modelValue": ($event) => unref(food).name = $event,
                                label: "Food Name",
                                rules: [(v) => !!v || "Food name is required"]
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VTextField, {
                                modelValue: unref(food).description,
                                "onUpdate:modelValue": ($event) => unref(food).description = $event,
                                label: "Description",
                                rules: [(v) => !!v || "Food description is required"]
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VSelect, {
                                modelValue: unref(food).quantity,
                                "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                                items: quantityList,
                                "item-title": "label",
                                "item-value": "value",
                                label: "Quantity",
                                rules: [(v) => !!v || "Please select a quantity"]
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VSwitch, {
                                class: "pb-3",
                                color: "green",
                                modelValue: unref(food).can_eat,
                                "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                                inset: "",
                                "hide-details": "",
                                label: unref(food).can_eat ? "They can eat this food" : "They should not eat this food"
                              }, null, _parent5, _scopeId4));
                              _push5(ssrRenderComponent(VBtn, {
                                onClick: submitForm,
                                color: "primary"
                              }, {
                                default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                  if (_push6) {
                                    _push6(`Submit`);
                                  } else {
                                    return [
                                      createTextVNode("Submit")
                                    ];
                                  }
                                }),
                                _: 1
                              }, _parent5, _scopeId4));
                            } else {
                              return [
                                createVNode(VTextField, {
                                  modelValue: unref(food).name,
                                  "onUpdate:modelValue": ($event) => unref(food).name = $event,
                                  label: "Food Name",
                                  rules: [(v) => !!v || "Food name is required"]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                createVNode(VTextField, {
                                  modelValue: unref(food).description,
                                  "onUpdate:modelValue": ($event) => unref(food).description = $event,
                                  label: "Description",
                                  rules: [(v) => !!v || "Food description is required"]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                createVNode(VSelect, {
                                  modelValue: unref(food).quantity,
                                  "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                                  items: quantityList,
                                  "item-title": "label",
                                  "item-value": "value",
                                  label: "Quantity",
                                  rules: [(v) => !!v || "Please select a quantity"]
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                                createVNode(VSwitch, {
                                  class: "pb-3",
                                  color: "green",
                                  modelValue: unref(food).can_eat,
                                  "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                                  inset: "",
                                  "hide-details": "",
                                  label: unref(food).can_eat ? "They can eat this food" : "They should not eat this food"
                                }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                                createVNode(VBtn, {
                                  onClick: submitForm,
                                  color: "primary"
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode("Submit")
                                  ]),
                                  _: 1
                                })
                              ];
                            }
                          }),
                          _: 1
                        }, _parent4, _scopeId3));
                      } else {
                        return [
                          createVNode(VForm, {
                            ref_key: "form",
                            ref: form,
                            modelValue: unref(valid),
                            "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null,
                            "lazy-validation": ""
                          }, {
                            default: withCtx(() => [
                              createVNode(VTextField, {
                                modelValue: unref(food).name,
                                "onUpdate:modelValue": ($event) => unref(food).name = $event,
                                label: "Food Name",
                                rules: [(v) => !!v || "Food name is required"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                              createVNode(VTextField, {
                                modelValue: unref(food).description,
                                "onUpdate:modelValue": ($event) => unref(food).description = $event,
                                label: "Description",
                                rules: [(v) => !!v || "Food description is required"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                              createVNode(VSelect, {
                                modelValue: unref(food).quantity,
                                "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                                items: quantityList,
                                "item-title": "label",
                                "item-value": "value",
                                label: "Quantity",
                                rules: [(v) => !!v || "Please select a quantity"]
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                              createVNode(VSwitch, {
                                class: "pb-3",
                                color: "green",
                                modelValue: unref(food).can_eat,
                                "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                                inset: "",
                                "hide-details": "",
                                label: unref(food).can_eat ? "They can eat this food" : "They should not eat this food"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                              createVNode(VBtn, {
                                onClick: submitForm,
                                color: "primary"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode("Submit")
                                ]),
                                _: 1
                              })
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "text-h5" }, {
                      default: withCtx(() => [
                        createTextVNode("Add New Food Item")
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        createVNode(VForm, {
                          ref_key: "form",
                          ref: form,
                          modelValue: unref(valid),
                          "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null,
                          "lazy-validation": ""
                        }, {
                          default: withCtx(() => [
                            createVNode(VTextField, {
                              modelValue: unref(food).name,
                              "onUpdate:modelValue": ($event) => unref(food).name = $event,
                              label: "Food Name",
                              rules: [(v) => !!v || "Food name is required"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                            createVNode(VTextField, {
                              modelValue: unref(food).description,
                              "onUpdate:modelValue": ($event) => unref(food).description = $event,
                              label: "Description",
                              rules: [(v) => !!v || "Food description is required"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                            createVNode(VSelect, {
                              modelValue: unref(food).quantity,
                              "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                              items: quantityList,
                              "item-title": "label",
                              "item-value": "value",
                              label: "Quantity",
                              rules: [(v) => !!v || "Please select a quantity"]
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                            createVNode(VSwitch, {
                              class: "pb-3",
                              color: "green",
                              modelValue: unref(food).can_eat,
                              "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                              inset: "",
                              "hide-details": "",
                              label: unref(food).can_eat ? "They can eat this food" : "They should not eat this food"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                            createVNode(VBtn, {
                              onClick: submitForm,
                              color: "primary"
                            }, {
                              default: withCtx(() => [
                                createTextVNode("Submit")
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      _: 1
                    })
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCard, null, {
                default: withCtx(() => [
                  createVNode(VCardTitle, { class: "text-h5" }, {
                    default: withCtx(() => [
                      createTextVNode("Add New Food Item")
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      createVNode(VForm, {
                        ref_key: "form",
                        ref: form,
                        modelValue: unref(valid),
                        "onUpdate:modelValue": ($event) => isRef(valid) ? valid.value = $event : null,
                        "lazy-validation": ""
                      }, {
                        default: withCtx(() => [
                          createVNode(VTextField, {
                            modelValue: unref(food).name,
                            "onUpdate:modelValue": ($event) => unref(food).name = $event,
                            label: "Food Name",
                            rules: [(v) => !!v || "Food name is required"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VTextField, {
                            modelValue: unref(food).description,
                            "onUpdate:modelValue": ($event) => unref(food).description = $event,
                            label: "Description",
                            rules: [(v) => !!v || "Food description is required"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VSelect, {
                            modelValue: unref(food).quantity,
                            "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                            items: quantityList,
                            "item-title": "label",
                            "item-value": "value",
                            label: "Quantity",
                            rules: [(v) => !!v || "Please select a quantity"]
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "rules"]),
                          createVNode(VSwitch, {
                            class: "pb-3",
                            color: "green",
                            modelValue: unref(food).can_eat,
                            "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                            inset: "",
                            "hide-details": "",
                            label: unref(food).can_eat ? "They can eat this food" : "They should not eat this food"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "label"]),
                          createVNode(VBtn, {
                            onClick: submitForm,
                            color: "primary"
                          }, {
                            default: withCtx(() => [
                              createTextVNode("Submit")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    _: 1
                  })
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/food/new.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=new-CGZMLx35.mjs.map

import { ref, computed, withCtx, unref, createTextVNode, toDisplayString, isRef, createVNode, createBlock, createCommentVNode, openBlock, shallowRef, watchEffect, watch, mergeProps, createElementVNode, Fragment, withDirectives, normalizeClass, vModelText, nextTick, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { useRouter, useRoute } from 'vue-router';
import { V as VCard, a as VCardTitle, b as VCardText, u as useApi } from './VCard-CEDBZ-Ln.mjs';
import { V as VContainer } from './VContainer-CAjm2g5h.mjs';
import { V as VAlert } from './VAlert-DbRy8BhV.mjs';
import { V as VForm, a as VSwitch } from './VSwitch-C1Kp_jQE.mjs';
import { V as VTextField, j as VSelect, k as useFocus, l as VInput, n as VField, o as VCounter, p as useAutofocus, h as forwardRefs, q as makeVFieldProps, r as makeVInputProps } from './VSelect-muYyrUe_.mjs';
import { d as genericComponent, p as propsFactory, f as useProxiedModel, X as filterInputAttrs, O as convertToUnit, S as clamp, Y as callEvent } from './server.mjs';
import { d as VBtn, e as VProgressCircular, I as Intersect, a as useRender } from './index-CV-ig810.mjs';
import './ssrBoot-ZQn7gOuX.mjs';
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

const makeVTextareaProps = propsFactory({
  autoGrow: Boolean,
  autofocus: Boolean,
  counter: [Boolean, Number, String],
  counterValue: Function,
  prefix: String,
  placeholder: String,
  persistentPlaceholder: Boolean,
  persistentCounter: Boolean,
  noResize: Boolean,
  rows: {
    type: [Number, String],
    default: 5,
    validator: (v) => !isNaN(parseFloat(v))
  },
  maxRows: {
    type: [Number, String],
    validator: (v) => !isNaN(parseFloat(v))
  },
  suffix: String,
  modelModifiers: Object,
  ...makeVInputProps(),
  ...makeVFieldProps()
}, "VTextarea");
const VTextarea = genericComponent()({
  name: "VTextarea",
  directives: {
    vIntersect: Intersect
  },
  inheritAttrs: false,
  props: makeVTextareaProps(),
  emits: {
    "click:control": (e) => true,
    "mousedown:control": (e) => true,
    "update:focused": (focused) => true,
    "update:modelValue": (val) => true
  },
  setup(props, _ref) {
    let {
      attrs,
      emit,
      slots
    } = _ref;
    const model = useProxiedModel(props, "modelValue");
    const {
      isFocused,
      focus,
      blur
    } = useFocus(props);
    const {
      onIntersect
    } = useAutofocus(props);
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : (model.value || "").toString().length;
    });
    const max = computed(() => {
      if (attrs.maxlength) return attrs.maxlength;
      if (!props.counter || typeof props.counter !== "number" && typeof props.counter !== "string") return void 0;
      return props.counter;
    });
    const vInputRef = ref();
    const vFieldRef = ref();
    const controlHeight = shallowRef("");
    const textareaRef = ref();
    const isActive = computed(() => props.persistentPlaceholder || isFocused.value || props.active);
    function onFocus() {
      var _a;
      if (textareaRef.value !== (void 0).activeElement) {
        (_a = textareaRef.value) == null ? void 0 : _a.focus();
      }
      if (!isFocused.value) focus();
    }
    function onControlClick(e) {
      onFocus();
      emit("click:control", e);
    }
    function onControlMousedown(e) {
      emit("mousedown:control", e);
    }
    function onClear(e) {
      e.stopPropagation();
      onFocus();
      nextTick(() => {
        model.value = "";
        callEvent(props["onClick:clear"], e);
      });
    }
    function onInput(e) {
      var _a;
      const el = e.target;
      model.value = el.value;
      if ((_a = props.modelModifiers) == null ? void 0 : _a.trim) {
        const caretPosition = [el.selectionStart, el.selectionEnd];
        nextTick(() => {
          el.selectionStart = caretPosition[0];
          el.selectionEnd = caretPosition[1];
        });
      }
    }
    const sizerRef = ref();
    const rows = ref(Number(props.rows));
    const isPlainOrUnderlined = computed(() => ["plain", "underlined"].includes(props.variant));
    watchEffect(() => {
      if (!props.autoGrow) rows.value = Number(props.rows);
    });
    function calculateInputHeight() {
      if (!props.autoGrow) return;
      nextTick(() => {
        if (!sizerRef.value || !vFieldRef.value) return;
        const style = getComputedStyle(sizerRef.value);
        const fieldStyle = getComputedStyle(vFieldRef.value.$el);
        const padding = parseFloat(style.getPropertyValue("--v-field-padding-top")) + parseFloat(style.getPropertyValue("--v-input-padding-top")) + parseFloat(style.getPropertyValue("--v-field-padding-bottom"));
        const height = sizerRef.value.scrollHeight;
        const lineHeight = parseFloat(style.lineHeight);
        const minHeight = Math.max(parseFloat(props.rows) * lineHeight + padding, parseFloat(fieldStyle.getPropertyValue("--v-input-control-height")));
        const maxHeight = parseFloat(props.maxRows) * lineHeight + padding || Infinity;
        const newHeight = clamp(height != null ? height : 0, minHeight, maxHeight);
        rows.value = Math.floor((newHeight - padding) / lineHeight);
        controlHeight.value = convertToUnit(newHeight);
      });
    }
    watch(model, calculateInputHeight);
    watch(() => props.rows, calculateInputHeight);
    watch(() => props.maxRows, calculateInputHeight);
    watch(() => props.density, calculateInputHeight);
    let observer;
    watch(sizerRef, (val) => {
      if (val) {
        observer = new ResizeObserver(calculateInputHeight);
        observer.observe(sizerRef.value);
      } else {
        observer == null ? void 0 : observer.disconnect();
      }
    });
    useRender(() => {
      const hasCounter = !!(slots.counter || props.counter || props.counterValue);
      const hasDetails = !!(hasCounter || slots.details);
      const [rootAttrs, inputAttrs] = filterInputAttrs(attrs);
      const {
        modelValue: _,
        ...inputProps
      } = VInput.filterProps(props);
      const fieldProps = VField.filterProps(props);
      return createVNode(VInput, mergeProps({
        "ref": vInputRef,
        "modelValue": model.value,
        "onUpdate:modelValue": ($event) => model.value = $event,
        "class": ["v-textarea v-text-field", {
          "v-textarea--prefixed": props.prefix,
          "v-textarea--suffixed": props.suffix,
          "v-text-field--prefixed": props.prefix,
          "v-text-field--suffixed": props.suffix,
          "v-textarea--auto-grow": props.autoGrow,
          "v-textarea--no-resize": props.noResize || props.autoGrow,
          "v-input--plain-underlined": isPlainOrUnderlined.value
        }, props.class],
        "style": props.style
      }, rootAttrs, inputProps, {
        "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
        "focused": isFocused.value
      }), {
        ...slots,
        default: (_ref2) => {
          let {
            id,
            isDisabled,
            isDirty,
            isReadonly,
            isValid
          } = _ref2;
          return createVNode(VField, mergeProps({
            "ref": vFieldRef,
            "style": {
              "--v-textarea-control-height": controlHeight.value
            },
            "onClick": onControlClick,
            "onMousedown": onControlMousedown,
            "onClick:clear": onClear,
            "onClick:prependInner": props["onClick:prependInner"],
            "onClick:appendInner": props["onClick:appendInner"]
          }, fieldProps, {
            "id": id.value,
            "active": isActive.value || isDirty.value,
            "centerAffix": rows.value === 1 && !isPlainOrUnderlined.value,
            "dirty": isDirty.value || props.dirty,
            "disabled": isDisabled.value,
            "focused": isFocused.value,
            "error": isValid.value === false
          }), {
            ...slots,
            default: (_ref3) => {
              let {
                props: {
                  class: fieldClass,
                  ...slotProps
                }
              } = _ref3;
              return createElementVNode(Fragment, null, [props.prefix && createElementVNode("span", {
                "class": "v-text-field__prefix"
              }, [props.prefix]), withDirectives(createElementVNode("textarea", mergeProps({
                "ref": textareaRef,
                "class": fieldClass,
                "value": model.value,
                "onInput": onInput,
                "autofocus": props.autofocus,
                "readonly": isReadonly.value,
                "disabled": isDisabled.value,
                "placeholder": props.placeholder,
                "rows": props.rows,
                "name": props.name,
                "onFocus": onFocus,
                "onBlur": blur
              }, slotProps, inputAttrs), null), [[Intersect, {
                handler: onIntersect
              }, null, {
                once: true
              }]]), props.autoGrow && withDirectives(createElementVNode("textarea", {
                "class": normalizeClass([fieldClass, "v-textarea__sizer"]),
                "id": `${slotProps.id}-sizer`,
                "onUpdate:modelValue": ($event) => model.value = $event,
                "ref": sizerRef,
                "readonly": true,
                "aria-hidden": "true"
              }, null), [[vModelText, model.value]]), props.suffix && createElementVNode("span", {
                "class": "v-text-field__suffix"
              }, [props.suffix])]);
            }
          });
        },
        details: hasDetails ? (slotProps) => {
          var _a;
          return createElementVNode(Fragment, null, [(_a = slots.details) == null ? void 0 : _a.call(slots, slotProps), hasCounter && createElementVNode(Fragment, null, [createElementVNode("span", null, null), createVNode(VCounter, {
            "active": props.persistentCounter || isFocused.value,
            "value": counterValue.value,
            "max": max.value,
            "disabled": props.disabled
          }, slots.counter)])]);
        } : void 0
      });
    });
    return forwardRefs({}, vInputRef, vFieldRef, textareaRef);
  }
});
const _sfc_main = {
  __name: "[id]",
  __ssrInlineRender: true,
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const { foods } = useApi();
    const form = ref(null);
    const valid = ref(false);
    const isLoading = ref(true);
    const isSubmitting = ref(false);
    const isDeleting = ref(false);
    const error = ref("");
    const food = ref({
      id: null,
      name: "",
      description: "",
      quantity: "",
      can_eat: false
    });
    const quantityList = [
      { value: "free", label: "Freely" },
      { value: "moderate", label: "In moderation" },
      { value: "rarely", label: "Rarely" },
      { value: "never", label: "Never" }
    ];
    const foodId = route.params.id;
    const isViewMode = computed(() => route.query.view !== void 0);
    const submitForm = async () => {
      var _a;
      if (!((_a = form.value) == null ? void 0 : _a.validate())) {
        return;
      }
      try {
        isSubmitting.value = true;
        error.value = "";
        const payload = {
          name: food.value.name,
          description: food.value.description,
          quantity: food.value.quantity,
          can_eat: food.value.can_eat ? 1 : 0
        };
        await foods.update(foodId, payload);
        router.push("/");
      } catch (err) {
        error.value = `Failed to update food: ${err.message}`;
        console.error("Error updating food:", err);
      } finally {
        isSubmitting.value = false;
      }
    };
    const deleteFood = async () => {
      if (!confirm("Are you sure you want to delete this food item? This action cannot be undone.")) {
        return;
      }
      try {
        isDeleting.value = true;
        error.value = "";
        await foods.delete(foodId);
        router.push("/");
      } catch (err) {
        error.value = `Failed to delete food: ${err.message}`;
        console.error("Error deleting food:", err);
      } finally {
        isDeleting.value = false;
      }
    };
    const goBack = () => {
      router.back();
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
                        _push4(`${ssrInterpolate(unref(isLoading) ? "Loading..." : unref(isViewMode) ? "Food Details" : "Edit Food Item")}`);
                      } else {
                        return [
                          createTextVNode(toDisplayString(unref(isLoading) ? "Loading..." : unref(isViewMode) ? "Food Details" : "Edit Food Item"), 1)
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                  _push3(ssrRenderComponent(VCardText, null, {
                    default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                      if (_push4) {
                        if (unref(error)) {
                          _push4(`<div class="mb-4"${_scopeId3}>`);
                          _push4(ssrRenderComponent(VAlert, {
                            type: "error",
                            text: unref(error)
                          }, null, _parent4, _scopeId3));
                          _push4(`</div>`);
                        } else {
                          _push4(`<!---->`);
                        }
                        if (!unref(isLoading)) {
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
                                  readonly: unref(isViewMode),
                                  rules: [(v) => !!v || "Food name is required"],
                                  required: ""
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VTextarea, {
                                  modelValue: unref(food).description,
                                  "onUpdate:modelValue": ($event) => unref(food).description = $event,
                                  label: "Description",
                                  readonly: unref(isViewMode),
                                  rules: [(v) => !!v || "Food description is required"],
                                  rows: "3",
                                  required: ""
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VSelect, {
                                  modelValue: unref(food).quantity,
                                  "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                                  items: quantityList,
                                  "item-title": "label",
                                  "item-value": "value",
                                  label: "Quantity",
                                  readonly: unref(isViewMode),
                                  rules: [(v) => !!v || "Please select a quantity"],
                                  required: ""
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VSwitch, {
                                  modelValue: unref(food).can_eat,
                                  "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                                  color: "success",
                                  inset: "",
                                  "hide-details": "",
                                  class: "mb-4",
                                  readonly: unref(isViewMode),
                                  label: unref(food).can_eat ? "Safe to eat" : "Not recommended"
                                }, null, _parent5, _scopeId4));
                                if (!unref(isViewMode)) {
                                  _push5(`<div class="d-flex gap-2"${_scopeId4}>`);
                                  _push5(ssrRenderComponent(VBtn, {
                                    onClick: submitForm,
                                    color: "primary",
                                    loading: unref(isSubmitting),
                                    disabled: !unref(valid) || unref(isSubmitting)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(` Update Food `);
                                      } else {
                                        return [
                                          createTextVNode(" Update Food ")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VBtn, {
                                    class: "mx-3",
                                    onClick: goBack,
                                    color: "grey",
                                    variant: "outlined",
                                    disabled: unref(isSubmitting)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(` Cancel `);
                                      } else {
                                        return [
                                          createTextVNode(" Cancel ")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(ssrRenderComponent(VBtn, {
                                    onClick: deleteFood,
                                    color: "error",
                                    variant: "outlined",
                                    loading: unref(isDeleting),
                                    disabled: unref(isSubmitting) || unref(isDeleting)
                                  }, {
                                    default: withCtx((_5, _push6, _parent6, _scopeId5) => {
                                      if (_push6) {
                                        _push6(` Delete `);
                                      } else {
                                        return [
                                          createTextVNode(" Delete ")
                                        ];
                                      }
                                    }),
                                    _: 1
                                  }, _parent5, _scopeId4));
                                  _push5(`</div>`);
                                } else {
                                  _push5(`<!---->`);
                                }
                              } else {
                                return [
                                  createVNode(VTextField, {
                                    modelValue: unref(food).name,
                                    "onUpdate:modelValue": ($event) => unref(food).name = $event,
                                    label: "Food Name",
                                    readonly: unref(isViewMode),
                                    rules: [(v) => !!v || "Food name is required"],
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                                  createVNode(VTextarea, {
                                    modelValue: unref(food).description,
                                    "onUpdate:modelValue": ($event) => unref(food).description = $event,
                                    label: "Description",
                                    readonly: unref(isViewMode),
                                    rules: [(v) => !!v || "Food description is required"],
                                    rows: "3",
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                                  createVNode(VSelect, {
                                    modelValue: unref(food).quantity,
                                    "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                                    items: quantityList,
                                    "item-title": "label",
                                    "item-value": "value",
                                    label: "Quantity",
                                    readonly: unref(isViewMode),
                                    rules: [(v) => !!v || "Please select a quantity"],
                                    required: ""
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                                  createVNode(VSwitch, {
                                    modelValue: unref(food).can_eat,
                                    "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                                    color: "success",
                                    inset: "",
                                    "hide-details": "",
                                    class: "mb-4",
                                    readonly: unref(isViewMode),
                                    label: unref(food).can_eat ? "Safe to eat" : "Not recommended"
                                  }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "label"]),
                                  !unref(isViewMode) ? (openBlock(), createBlock("div", {
                                    key: 0,
                                    class: "d-flex gap-2"
                                  }, [
                                    createVNode(VBtn, {
                                      onClick: submitForm,
                                      color: "primary",
                                      loading: unref(isSubmitting),
                                      disabled: !unref(valid) || unref(isSubmitting)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Update Food ")
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "disabled"]),
                                    createVNode(VBtn, {
                                      class: "mx-3",
                                      onClick: goBack,
                                      color: "grey",
                                      variant: "outlined",
                                      disabled: unref(isSubmitting)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Cancel ")
                                      ]),
                                      _: 1
                                    }, 8, ["disabled"]),
                                    createVNode(VBtn, {
                                      onClick: deleteFood,
                                      color: "error",
                                      variant: "outlined",
                                      loading: unref(isDeleting),
                                      disabled: unref(isSubmitting) || unref(isDeleting)
                                    }, {
                                      default: withCtx(() => [
                                        createTextVNode(" Delete ")
                                      ]),
                                      _: 1
                                    }, 8, ["loading", "disabled"])
                                  ])) : createCommentVNode("", true)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          _push4(`<div class="text-center py-4"${_scopeId3}>`);
                          _push4(ssrRenderComponent(VProgressCircular, {
                            indeterminate: "",
                            color: "primary"
                          }, null, _parent4, _scopeId3));
                          _push4(`<p class="mt-2"${_scopeId3}>Loading food details...</p></div>`);
                        }
                      } else {
                        return [
                          unref(error) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "mb-4"
                          }, [
                            createVNode(VAlert, {
                              type: "error",
                              text: unref(error)
                            }, null, 8, ["text"])
                          ])) : createCommentVNode("", true),
                          !unref(isLoading) ? (openBlock(), createBlock(VForm, {
                            key: 1,
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
                                readonly: unref(isViewMode),
                                rules: [(v) => !!v || "Food name is required"],
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                              createVNode(VTextarea, {
                                modelValue: unref(food).description,
                                "onUpdate:modelValue": ($event) => unref(food).description = $event,
                                label: "Description",
                                readonly: unref(isViewMode),
                                rules: [(v) => !!v || "Food description is required"],
                                rows: "3",
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                              createVNode(VSelect, {
                                modelValue: unref(food).quantity,
                                "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                                items: quantityList,
                                "item-title": "label",
                                "item-value": "value",
                                label: "Quantity",
                                readonly: unref(isViewMode),
                                rules: [(v) => !!v || "Please select a quantity"],
                                required: ""
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                              createVNode(VSwitch, {
                                modelValue: unref(food).can_eat,
                                "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                                color: "success",
                                inset: "",
                                "hide-details": "",
                                class: "mb-4",
                                readonly: unref(isViewMode),
                                label: unref(food).can_eat ? "Safe to eat" : "Not recommended"
                              }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "label"]),
                              !unref(isViewMode) ? (openBlock(), createBlock("div", {
                                key: 0,
                                class: "d-flex gap-2"
                              }, [
                                createVNode(VBtn, {
                                  onClick: submitForm,
                                  color: "primary",
                                  loading: unref(isSubmitting),
                                  disabled: !unref(valid) || unref(isSubmitting)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Update Food ")
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disabled"]),
                                createVNode(VBtn, {
                                  class: "mx-3",
                                  onClick: goBack,
                                  color: "grey",
                                  variant: "outlined",
                                  disabled: unref(isSubmitting)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Cancel ")
                                  ]),
                                  _: 1
                                }, 8, ["disabled"]),
                                createVNode(VBtn, {
                                  onClick: deleteFood,
                                  color: "error",
                                  variant: "outlined",
                                  loading: unref(isDeleting),
                                  disabled: unref(isSubmitting) || unref(isDeleting)
                                }, {
                                  default: withCtx(() => [
                                    createTextVNode(" Delete ")
                                  ]),
                                  _: 1
                                }, 8, ["loading", "disabled"])
                              ])) : createCommentVNode("", true)
                            ]),
                            _: 1
                          }, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock("div", {
                            key: 2,
                            class: "text-center py-4"
                          }, [
                            createVNode(VProgressCircular, {
                              indeterminate: "",
                              color: "primary"
                            }),
                            createVNode("p", { class: "mt-2" }, "Loading food details...")
                          ]))
                        ];
                      }
                    }),
                    _: 1
                  }, _parent3, _scopeId2));
                } else {
                  return [
                    createVNode(VCardTitle, { class: "text-h5" }, {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(isLoading) ? "Loading..." : unref(isViewMode) ? "Food Details" : "Edit Food Item"), 1)
                      ]),
                      _: 1
                    }),
                    createVNode(VCardText, null, {
                      default: withCtx(() => [
                        unref(error) ? (openBlock(), createBlock("div", {
                          key: 0,
                          class: "mb-4"
                        }, [
                          createVNode(VAlert, {
                            type: "error",
                            text: unref(error)
                          }, null, 8, ["text"])
                        ])) : createCommentVNode("", true),
                        !unref(isLoading) ? (openBlock(), createBlock(VForm, {
                          key: 1,
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
                              readonly: unref(isViewMode),
                              rules: [(v) => !!v || "Food name is required"],
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                            createVNode(VTextarea, {
                              modelValue: unref(food).description,
                              "onUpdate:modelValue": ($event) => unref(food).description = $event,
                              label: "Description",
                              readonly: unref(isViewMode),
                              rules: [(v) => !!v || "Food description is required"],
                              rows: "3",
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                            createVNode(VSelect, {
                              modelValue: unref(food).quantity,
                              "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                              items: quantityList,
                              "item-title": "label",
                              "item-value": "value",
                              label: "Quantity",
                              readonly: unref(isViewMode),
                              rules: [(v) => !!v || "Please select a quantity"],
                              required: ""
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                            createVNode(VSwitch, {
                              modelValue: unref(food).can_eat,
                              "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                              color: "success",
                              inset: "",
                              "hide-details": "",
                              class: "mb-4",
                              readonly: unref(isViewMode),
                              label: unref(food).can_eat ? "Safe to eat" : "Not recommended"
                            }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "label"]),
                            !unref(isViewMode) ? (openBlock(), createBlock("div", {
                              key: 0,
                              class: "d-flex gap-2"
                            }, [
                              createVNode(VBtn, {
                                onClick: submitForm,
                                color: "primary",
                                loading: unref(isSubmitting),
                                disabled: !unref(valid) || unref(isSubmitting)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Update Food ")
                                ]),
                                _: 1
                              }, 8, ["loading", "disabled"]),
                              createVNode(VBtn, {
                                class: "mx-3",
                                onClick: goBack,
                                color: "grey",
                                variant: "outlined",
                                disabled: unref(isSubmitting)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Cancel ")
                                ]),
                                _: 1
                              }, 8, ["disabled"]),
                              createVNode(VBtn, {
                                onClick: deleteFood,
                                color: "error",
                                variant: "outlined",
                                loading: unref(isDeleting),
                                disabled: unref(isSubmitting) || unref(isDeleting)
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(" Delete ")
                                ]),
                                _: 1
                              }, 8, ["loading", "disabled"])
                            ])) : createCommentVNode("", true)
                          ]),
                          _: 1
                        }, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock("div", {
                          key: 2,
                          class: "text-center py-4"
                        }, [
                          createVNode(VProgressCircular, {
                            indeterminate: "",
                            color: "primary"
                          }),
                          createVNode("p", { class: "mt-2" }, "Loading food details...")
                        ]))
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
                      createTextVNode(toDisplayString(unref(isLoading) ? "Loading..." : unref(isViewMode) ? "Food Details" : "Edit Food Item"), 1)
                    ]),
                    _: 1
                  }),
                  createVNode(VCardText, null, {
                    default: withCtx(() => [
                      unref(error) ? (openBlock(), createBlock("div", {
                        key: 0,
                        class: "mb-4"
                      }, [
                        createVNode(VAlert, {
                          type: "error",
                          text: unref(error)
                        }, null, 8, ["text"])
                      ])) : createCommentVNode("", true),
                      !unref(isLoading) ? (openBlock(), createBlock(VForm, {
                        key: 1,
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
                            readonly: unref(isViewMode),
                            rules: [(v) => !!v || "Food name is required"],
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                          createVNode(VTextarea, {
                            modelValue: unref(food).description,
                            "onUpdate:modelValue": ($event) => unref(food).description = $event,
                            label: "Description",
                            readonly: unref(isViewMode),
                            rules: [(v) => !!v || "Food description is required"],
                            rows: "3",
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                          createVNode(VSelect, {
                            modelValue: unref(food).quantity,
                            "onUpdate:modelValue": ($event) => unref(food).quantity = $event,
                            items: quantityList,
                            "item-title": "label",
                            "item-value": "value",
                            label: "Quantity",
                            readonly: unref(isViewMode),
                            rules: [(v) => !!v || "Please select a quantity"],
                            required: ""
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "rules"]),
                          createVNode(VSwitch, {
                            modelValue: unref(food).can_eat,
                            "onUpdate:modelValue": ($event) => unref(food).can_eat = $event,
                            color: "success",
                            inset: "",
                            "hide-details": "",
                            class: "mb-4",
                            readonly: unref(isViewMode),
                            label: unref(food).can_eat ? "Safe to eat" : "Not recommended"
                          }, null, 8, ["modelValue", "onUpdate:modelValue", "readonly", "label"]),
                          !unref(isViewMode) ? (openBlock(), createBlock("div", {
                            key: 0,
                            class: "d-flex gap-2"
                          }, [
                            createVNode(VBtn, {
                              onClick: submitForm,
                              color: "primary",
                              loading: unref(isSubmitting),
                              disabled: !unref(valid) || unref(isSubmitting)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Update Food ")
                              ]),
                              _: 1
                            }, 8, ["loading", "disabled"]),
                            createVNode(VBtn, {
                              class: "mx-3",
                              onClick: goBack,
                              color: "grey",
                              variant: "outlined",
                              disabled: unref(isSubmitting)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Cancel ")
                              ]),
                              _: 1
                            }, 8, ["disabled"]),
                            createVNode(VBtn, {
                              onClick: deleteFood,
                              color: "error",
                              variant: "outlined",
                              loading: unref(isDeleting),
                              disabled: unref(isSubmitting) || unref(isDeleting)
                            }, {
                              default: withCtx(() => [
                                createTextVNode(" Delete ")
                              ]),
                              _: 1
                            }, 8, ["loading", "disabled"])
                          ])) : createCommentVNode("", true)
                        ]),
                        _: 1
                      }, 8, ["modelValue", "onUpdate:modelValue"])) : (openBlock(), createBlock("div", {
                        key: 2,
                        class: "text-center py-4"
                      }, [
                        createVNode(VProgressCircular, {
                          indeterminate: "",
                          color: "primary"
                        }),
                        createVNode("p", { class: "mt-2" }, "Loading food details...")
                      ]))
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/food/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=_id_-DaIIn7cI.mjs.map

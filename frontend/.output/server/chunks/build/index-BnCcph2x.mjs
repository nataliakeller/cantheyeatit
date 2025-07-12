import { ref, watch, mergeProps, withCtx, createTextVNode, unref, isRef, toDisplayString, createVNode, createBlock, createCommentVNode, openBlock, shallowRef, computed, nextTick, createElementVNode, Fragment, normalizeStyle, normalizeClass, watchEffect, useSSRContext } from 'vue';
import { ssrRenderComponent, ssrInterpolate } from 'vue/server-renderer';
import { u as useApi, V as VCard, a as VCardTitle, b as VCardText, c as VCardActions, d as VChip, e as VAvatar } from './VCard-CEDBZ-Ln.mjs';
import { u as useItems, a as useForm, b as useScrolling, V as VTextField, c as VMenu, d as VList, e as VListItem, f as VVirtualScroll, g as VCheckboxBtn, h as forwardRefs, m as makeSelectProps, i as makeVTextFieldProps } from './VSelect-muYyrUe_.mjs';
import { V as VProgressLinear, u as useTextColor, a as useRender, b as VIcon, c as VDefaultsProvider, m as makeTransitionProps$1 } from './index-CV-ig810.mjs';
import { d as genericComponent, p as propsFactory, e as useLocale, f as useProxiedModel, w as wrapInArray, h as noop, i as ensureValidVNode, o as omit, j as checkPrintable, m as matchesSelector, k as deepEqual, g as getPropertyFromItem } from './server.mjs';
import { V as VAlert } from './VAlert-DbRy8BhV.mjs';
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
import 'vue-router';

const defaultFilter = (value, query, item) => {
  if (value == null || query == null) return -1;
  if (!query.length) return 0;
  value = value.toString().toLocaleLowerCase();
  query = query.toString().toLocaleLowerCase();
  const result = [];
  let idx = value.indexOf(query);
  while (~idx) {
    result.push([idx, idx + query.length]);
    idx = value.indexOf(query, idx + query.length);
  }
  return result.length ? result : -1;
};
function normaliseMatch(match, query) {
  if (match == null || typeof match === "boolean" || match === -1) return;
  if (typeof match === "number") return [[match, match + query.length]];
  if (Array.isArray(match[0])) return match;
  return [match];
}
const makeFilterProps = propsFactory({
  customFilter: Function,
  customKeyFilter: Object,
  filterKeys: [Array, String],
  filterMode: {
    type: String,
    default: "intersection"
  },
  noFilter: Boolean
}, "filter");
function filterItems(items, query, options) {
  var _a2, _b;
  var _a;
  const array = [];
  const filter = (_a2 = options == null ? void 0 : options.default) != null ? _a2 : defaultFilter;
  const keys = (options == null ? void 0 : options.filterKeys) ? wrapInArray(options.filterKeys) : false;
  const customFiltersLength = Object.keys((_b = options == null ? void 0 : options.customKeyFilter) != null ? _b : {}).length;
  if (!(items == null ? void 0 : items.length)) return array;
  loop: for (let i = 0; i < items.length; i++) {
    const [item, transformed = item] = wrapInArray(items[i]);
    const customMatches = {};
    const defaultMatches = {};
    let match = -1;
    if ((query || customFiltersLength > 0) && !(options == null ? void 0 : options.noFilter)) {
      if (typeof item === "object") {
        const filterKeys = keys || Object.keys(transformed);
        for (const key of filterKeys) {
          const value = getPropertyFromItem(transformed, key);
          const keyFilter = (_a = options == null ? void 0 : options.customKeyFilter) == null ? void 0 : _a[key];
          match = keyFilter ? keyFilter(value, query, item) : filter(value, query, item);
          if (match !== -1 && match !== false) {
            if (keyFilter) customMatches[key] = normaliseMatch(match, query);
            else defaultMatches[key] = normaliseMatch(match, query);
          } else if ((options == null ? void 0 : options.filterMode) === "every") {
            continue loop;
          }
        }
      } else {
        match = filter(item, query, item);
        if (match !== -1 && match !== false) {
          defaultMatches.title = normaliseMatch(match, query);
        }
      }
      const defaultMatchesLength = Object.keys(defaultMatches).length;
      const customMatchesLength = Object.keys(customMatches).length;
      if (!defaultMatchesLength && !customMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === "union" && customMatchesLength !== customFiltersLength && !defaultMatchesLength) continue;
      if ((options == null ? void 0 : options.filterMode) === "intersection" && (customMatchesLength !== customFiltersLength || !defaultMatchesLength)) continue;
    }
    array.push({
      index: i,
      matches: {
        ...defaultMatches,
        ...customMatches
      }
    });
  }
  return array;
}
function useFilter(props, items, query, options) {
  const filteredItems = shallowRef([]);
  const filteredMatches = shallowRef(/* @__PURE__ */ new Map());
  const transformedItems = computed(() => unref(items));
  watchEffect(() => {
    const _query = typeof query === "function" ? query() : unref(query);
    const strQuery = typeof _query !== "string" && typeof _query !== "number" ? "" : String(_query);
    const results = filterItems(transformedItems.value, strQuery, {
      customKeyFilter: {
        ...props.customKeyFilter,
        ...unref(void 0 )
      },
      default: props.customFilter,
      filterKeys: props.filterKeys,
      filterMode: props.filterMode,
      noFilter: props.noFilter
    });
    const originalItems = unref(items);
    const _filteredItems = [];
    const _filteredMatches = /* @__PURE__ */ new Map();
    results.forEach((_ref) => {
      let {
        index,
        matches
      } = _ref;
      const item = originalItems[index];
      _filteredItems.push(item);
      _filteredMatches.set(item.value, matches);
    });
    filteredItems.value = _filteredItems;
    filteredMatches.value = _filteredMatches;
  });
  function getMatches(item) {
    return filteredMatches.value.get(item.value);
  }
  return {
    filteredItems,
    filteredMatches,
    getMatches
  };
}
function highlightResult(name, text, matches) {
  if (matches == null || !matches.length) return text;
  return matches.map((match, i) => {
    const start = i === 0 ? 0 : matches[i - 1][1];
    const result = [createElementVNode("span", {
      "class": normalizeClass(`${name}__unmask`)
    }, [text.slice(start, match[0])]), createElementVNode("span", {
      "class": normalizeClass(`${name}__mask`)
    }, [text.slice(match[0], match[1])])];
    if (i === matches.length - 1) {
      result.push(createElementVNode("span", {
        "class": normalizeClass(`${name}__unmask`)
      }, [text.slice(match[1])]));
    }
    return createElementVNode(Fragment, null, [result]);
  });
}
const makeVAutocompleteProps = propsFactory({
  autoSelectFirst: {
    type: [Boolean, String]
  },
  clearOnSelect: Boolean,
  search: String,
  ...makeFilterProps({
    filterKeys: ["title"]
  }),
  ...makeSelectProps(),
  ...omit(makeVTextFieldProps({
    modelValue: null,
    role: "combobox"
  }), ["validationValue", "dirty", "appendInnerIcon"]),
  ...makeTransitionProps$1({
    transition: false
  })
}, "VAutocomplete");
const VAutocomplete = genericComponent()({
  name: "VAutocomplete",
  props: makeVAutocompleteProps(),
  emits: {
    "update:focused": (focused) => true,
    "update:search": (value) => true,
    "update:modelValue": (value) => true,
    "update:menu": (value) => true
  },
  setup(props, _ref) {
    let {
      slots
    } = _ref;
    const {
      t
    } = useLocale();
    const vTextFieldRef = ref();
    const isFocused = shallowRef(false);
    const isPristine = shallowRef(true);
    const listHasFocus = shallowRef(false);
    const vMenuRef = ref();
    const vVirtualScrollRef = ref();
    const selectionIndex = shallowRef(-1);
    const {
      items,
      transformIn,
      transformOut
    } = useItems(props);
    const {
      textColorClasses,
      textColorStyles
    } = useTextColor(() => {
      var _a;
      return (_a = vTextFieldRef.value) == null ? void 0 : _a.color;
    });
    const search = useProxiedModel(props, "search", "");
    const model = useProxiedModel(props, "modelValue", [], (v) => transformIn(v === null ? [null] : wrapInArray(v)), (v) => {
      var _a;
      const transformed = transformOut(v);
      return props.multiple ? transformed : (_a = transformed[0]) != null ? _a : null;
    });
    const counterValue = computed(() => {
      return typeof props.counterValue === "function" ? props.counterValue(model.value) : typeof props.counterValue === "number" ? props.counterValue : model.value.length;
    });
    const form = useForm(props);
    const {
      filteredItems,
      getMatches
    } = useFilter(props, items, () => isPristine.value ? "" : search.value);
    const displayItems = computed(() => {
      if (props.hideSelected) {
        return filteredItems.value.filter((filteredItem) => !model.value.some((s) => s.value === filteredItem.value));
      }
      return filteredItems.value;
    });
    const hasChips = computed(() => !!(props.chips || slots.chip));
    const hasSelectionSlot = computed(() => hasChips.value || !!slots.selection);
    const selectedValues = computed(() => model.value.map((selection) => selection.props.value));
    const highlightFirst = computed(() => {
      var _a;
      const selectFirst = props.autoSelectFirst === true || props.autoSelectFirst === "exact" && search.value === ((_a = displayItems.value[0]) == null ? void 0 : _a.title);
      return selectFirst && displayItems.value.length > 0 && !isPristine.value && !listHasFocus.value;
    });
    const menuDisabled = computed(() => props.hideNoData && !displayItems.value.length || form.isReadonly.value || form.isDisabled.value);
    const _menu = useProxiedModel(props, "menu");
    const menu = computed({
      get: () => _menu.value,
      set: (v) => {
        var _a;
        if (_menu.value && !v && ((_a = vMenuRef.value) == null ? void 0 : _a.\u03A8openChildren.size)) return;
        if (v && menuDisabled.value) return;
        _menu.value = v;
      }
    });
    const label = computed(() => menu.value ? props.closeText : props.openText);
    const listRef = ref();
    const listEvents = useScrolling(listRef, vTextFieldRef);
    function onClear(e) {
      if (props.openOnClear) {
        menu.value = true;
      }
      search.value = "";
    }
    function onMousedownControl() {
      if (menuDisabled.value) return;
      menu.value = true;
    }
    function onMousedownMenuIcon(e) {
      if (menuDisabled.value) return;
      if (isFocused.value) {
        e.preventDefault();
        e.stopPropagation();
      }
      menu.value = !menu.value;
    }
    function onListKeydown(e) {
      var _a;
      if (e.key !== " " && checkPrintable(e)) {
        (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
      }
    }
    function onKeydown(e) {
      var _a2;
      var _a, _b, _c, _d, _e;
      if (form.isReadonly.value) return;
      const selectionStart = (_a = vTextFieldRef.value) == null ? void 0 : _a.selectionStart;
      const length = model.value.length;
      if (["Enter", "ArrowDown", "ArrowUp"].includes(e.key)) {
        e.preventDefault();
      }
      if (["Enter", "ArrowDown"].includes(e.key)) {
        menu.value = true;
      }
      if (["Escape"].includes(e.key)) {
        menu.value = false;
      }
      if (highlightFirst.value && ["Enter", "Tab"].includes(e.key) && !model.value.some((_ref2) => {
        let {
          value
        } = _ref2;
        return value === displayItems.value[0].value;
      })) {
        select(displayItems.value[0]);
      }
      if (e.key === "ArrowDown" && highlightFirst.value) {
        (_b = listRef.value) == null ? void 0 : _b.focus("next");
      }
      if (["Backspace", "Delete"].includes(e.key)) {
        if (!props.multiple && hasSelectionSlot.value && model.value.length > 0 && !search.value) return select(model.value[0], false);
        if (~selectionIndex.value) {
          e.preventDefault();
          const originalSelectionIndex = selectionIndex.value;
          select(model.value[selectionIndex.value], false);
          selectionIndex.value = originalSelectionIndex >= length - 1 ? length - 2 : originalSelectionIndex;
        } else if (e.key === "Backspace" && !search.value) {
          selectionIndex.value = length - 1;
        }
        return;
      }
      if (!props.multiple) return;
      if (e.key === "ArrowLeft") {
        if (selectionIndex.value < 0 && selectionStart && selectionStart > 0) return;
        const prev = selectionIndex.value > -1 ? selectionIndex.value - 1 : length - 1;
        if (model.value[prev]) {
          selectionIndex.value = prev;
        } else {
          const searchLength = (_a2 = (_c = search.value) == null ? void 0 : _c.length) != null ? _a2 : null;
          selectionIndex.value = -1;
          (_d = vTextFieldRef.value) == null ? void 0 : _d.setSelectionRange(searchLength, searchLength);
        }
      } else if (e.key === "ArrowRight") {
        if (selectionIndex.value < 0) return;
        const next = selectionIndex.value + 1;
        if (model.value[next]) {
          selectionIndex.value = next;
        } else {
          selectionIndex.value = -1;
          (_e = vTextFieldRef.value) == null ? void 0 : _e.setSelectionRange(0, 0);
        }
      } else if (~selectionIndex.value && checkPrintable(e)) {
        selectionIndex.value = -1;
      }
    }
    function onChange(e) {
      if (matchesSelector(vTextFieldRef.value) || matchesSelector(vTextFieldRef.value)) ;
    }
    function onAfterEnter() {
      var _a;
      if (props.eager) {
        (_a = vVirtualScrollRef.value) == null ? void 0 : _a.calculateVisibleItems();
      }
    }
    function onAfterLeave() {
      var _a;
      if (isFocused.value) {
        isPristine.value = true;
        (_a = vTextFieldRef.value) == null ? void 0 : _a.focus();
      }
    }
    function onFocusin(e) {
      isFocused.value = true;
      setTimeout(() => {
        listHasFocus.value = true;
      });
    }
    function onFocusout(e) {
      listHasFocus.value = false;
    }
    function onUpdateModelValue(v) {
      if (v == null || v === "" && !props.multiple && !hasSelectionSlot.value) model.value = [];
    }
    const isSelecting = shallowRef(false);
    function select(item) {
      let set = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : true;
      if (!item || item.props.disabled) return;
      if (props.multiple) {
        const index = model.value.findIndex((selection) => (props.valueComparator || deepEqual)(selection.value, item.value));
        const add = set == null ? !~index : set;
        if (~index) {
          const value = add ? [...model.value, item] : [...model.value];
          value.splice(index, 1);
          model.value = value;
        } else if (add) {
          model.value = [...model.value, item];
        }
        if (props.clearOnSelect) {
          search.value = "";
        }
      } else {
        const add = set !== false;
        model.value = add ? [item] : [];
        search.value = add && !hasSelectionSlot.value ? item.title : "";
        nextTick(() => {
          menu.value = false;
          isPristine.value = true;
        });
      }
    }
    watch(isFocused, (val, oldVal) => {
      var _a2;
      var _a;
      if (val === oldVal) return;
      if (val) {
        isSelecting.value = true;
        search.value = props.multiple || hasSelectionSlot.value ? "" : String((_a2 = (_a = model.value.at(-1)) == null ? void 0 : _a.props.title) != null ? _a2 : "");
        isPristine.value = true;
        nextTick(() => isSelecting.value = false);
      } else {
        if (!props.multiple && search.value == null) model.value = [];
        menu.value = false;
        if (props.multiple || hasSelectionSlot.value) search.value = "";
        selectionIndex.value = -1;
      }
    });
    watch(search, (val) => {
      if (!isFocused.value || isSelecting.value) return;
      if (val) menu.value = true;
      isPristine.value = !val;
    });
    watch(menu, () => {
      if (!props.hideSelected && menu.value && model.value.length) {
        displayItems.value.findIndex((item) => model.value.some((s) => item.value === s.value));
      }
    });
    watch(() => props.items, (newVal, oldVal) => {
      if (menu.value) return;
      if (isFocused.value && !oldVal.length && newVal.length) {
        menu.value = true;
      }
    });
    useRender(() => {
      const hasList = !!(!props.hideNoData || displayItems.value.length || slots["prepend-item"] || slots["append-item"] || slots["no-data"]);
      const isDirty = model.value.length > 0;
      const textFieldProps = VTextField.filterProps(props);
      return createVNode(VTextField, mergeProps({
        "ref": vTextFieldRef
      }, textFieldProps, {
        "modelValue": search.value,
        "onUpdate:modelValue": [($event) => search.value = $event, onUpdateModelValue],
        "focused": isFocused.value,
        "onUpdate:focused": ($event) => isFocused.value = $event,
        "validationValue": model.externalValue,
        "counterValue": counterValue.value,
        "dirty": isDirty,
        "onChange": onChange,
        "class": ["v-autocomplete", `v-autocomplete--${props.multiple ? "multiple" : "single"}`, {
          "v-autocomplete--active-menu": menu.value,
          "v-autocomplete--chips": !!props.chips,
          "v-autocomplete--selection-slot": !!hasSelectionSlot.value,
          "v-autocomplete--selecting-index": selectionIndex.value > -1
        }, props.class],
        "style": props.style,
        "readonly": form.isReadonly.value,
        "placeholder": isDirty ? void 0 : props.placeholder,
        "onClick:clear": onClear,
        "onMousedown:control": onMousedownControl,
        "onKeydown": onKeydown
      }), {
        ...slots,
        default: () => createElementVNode(Fragment, null, [createVNode(VMenu, mergeProps({
          "ref": vMenuRef,
          "modelValue": menu.value,
          "onUpdate:modelValue": ($event) => menu.value = $event,
          "activator": "parent",
          "contentClass": "v-autocomplete__content",
          "disabled": menuDisabled.value,
          "eager": props.eager,
          "maxHeight": 310,
          "openOnClick": false,
          "closeOnContentClick": false,
          "transition": props.transition,
          "onAfterEnter": onAfterEnter,
          "onAfterLeave": onAfterLeave
        }, props.menuProps), {
          default: () => {
            var _a;
            return [hasList && createVNode(VList, mergeProps({
              "ref": listRef,
              "selected": selectedValues.value,
              "selectStrategy": props.multiple ? "independent" : "single-independent",
              "onMousedown": (e) => e.preventDefault(),
              "onKeydown": onListKeydown,
              "onFocusin": onFocusin,
              "onFocusout": onFocusout,
              "tabindex": "-1",
              "aria-live": "polite",
              "color": (_a = props.itemColor) != null ? _a : props.color
            }, listEvents, props.listProps), {
              default: () => {
                var _a3;
                var _a2, _b, _c;
                return [(_a2 = slots["prepend-item"]) == null ? void 0 : _a2.call(slots), !displayItems.value.length && !props.hideNoData && ((_a3 = (_b = slots["no-data"]) == null ? void 0 : _b.call(slots)) != null ? _a3 : createVNode(VListItem, {
                  "key": "no-data",
                  "title": t(props.noDataText)
                }, null)), createVNode(VVirtualScroll, {
                  "ref": vVirtualScrollRef,
                  "renderless": true,
                  "items": displayItems.value,
                  "itemKey": "value"
                }, {
                  default: (_ref3) => {
                    var _a4;
                    var _a22;
                    let {
                      item,
                      index,
                      itemRef
                    } = _ref3;
                    const itemProps = mergeProps(item.props, {
                      ref: itemRef,
                      key: item.value,
                      active: highlightFirst.value && index === 0 ? true : void 0,
                      onClick: () => select(item, null)
                    });
                    return (_a4 = (_a22 = slots.item) == null ? void 0 : _a22.call(slots, {
                      item,
                      index,
                      props: itemProps
                    })) != null ? _a4 : createVNode(VListItem, mergeProps(itemProps, {
                      "role": "option"
                    }), {
                      prepend: (_ref4) => {
                        let {
                          isSelected
                        } = _ref4;
                        return createElementVNode(Fragment, null, [props.multiple && !props.hideSelected ? createVNode(VCheckboxBtn, {
                          "key": item.value,
                          "modelValue": isSelected,
                          "ripple": false,
                          "tabindex": "-1"
                        }, null) : void 0, item.props.prependAvatar && createVNode(VAvatar, {
                          "image": item.props.prependAvatar
                        }, null), item.props.prependIcon && createVNode(VIcon, {
                          "icon": item.props.prependIcon
                        }, null)]);
                      },
                      title: () => {
                        var _a32;
                        return isPristine.value ? item.title : highlightResult("v-autocomplete", item.title, (_a32 = getMatches(item)) == null ? void 0 : _a32.title);
                      }
                    });
                  }
                }), (_c = slots["append-item"]) == null ? void 0 : _c.call(slots)];
              }
            })];
          }
        }), model.value.map((item, index) => {
          function onChipClose(e) {
            e.stopPropagation();
            e.preventDefault();
            select(item, false);
          }
          const slotProps = {
            "onClick:close": onChipClose,
            onKeydown(e) {
              if (e.key !== "Enter" && e.key !== " ") return;
              e.preventDefault();
              e.stopPropagation();
              onChipClose(e);
            },
            onMousedown(e) {
              e.preventDefault();
              e.stopPropagation();
            },
            modelValue: true,
            "onUpdate:modelValue": void 0
          };
          const hasSlot = hasChips.value ? !!slots.chip : !!slots.selection;
          const slotContent = hasSlot ? ensureValidVNode(hasChips.value ? slots.chip({
            item,
            index,
            props: slotProps
          }) : slots.selection({
            item,
            index
          })) : void 0;
          if (hasSlot && !slotContent) return void 0;
          return createElementVNode("div", {
            "key": item.value,
            "class": normalizeClass(["v-autocomplete__selection", index === selectionIndex.value && ["v-autocomplete__selection--selected", textColorClasses.value]]),
            "style": normalizeStyle(index === selectionIndex.value ? textColorStyles.value : {})
          }, [hasChips.value ? !slots.chip ? createVNode(VChip, mergeProps({
            "key": "chip",
            "closable": props.closableChips,
            "size": "small",
            "text": item.title,
            "disabled": item.props.disabled
          }, slotProps), null) : createVNode(VDefaultsProvider, {
            "key": "chip-defaults",
            "defaults": {
              VChip: {
                closable: props.closableChips,
                size: "small",
                text: item.title
              }
            }
          }, {
            default: () => [slotContent]
          }) : slotContent != null ? slotContent : createElementVNode("span", {
            "class": "v-autocomplete__selection-text"
          }, [item.title, props.multiple && index < model.value.length - 1 && createElementVNode("span", {
            "class": "v-autocomplete__selection-comma"
          }, [createTextVNode(",")])])]);
        })]),
        "append-inner": function() {
          var _a, _b;
          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }
          return createElementVNode(Fragment, null, [(_a = slots["append-inner"]) == null ? void 0 : _a.call(slots, ...args), props.menuIcon ? createVNode(VIcon, {
            "class": "v-autocomplete__menu-icon",
            "color": (_b = vTextFieldRef.value) == null ? void 0 : _b.fieldIconColor,
            "icon": props.menuIcon,
            "onMousedown": onMousedownMenuIcon,
            "onClick": noop,
            "aria-label": t(label.value),
            "title": t(label.value),
            "tabindex": "-1"
          }, null) : void 0]);
        }
      });
    });
    return forwardRefs({
      isFocused,
      isPristine,
      menu,
      search,
      filteredItems,
      select
    }, vTextFieldRef);
  }
});
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const { foods } = useApi();
    const foodItems = ref([]);
    const selectedFood = ref(null);
    const selectedFoodData = ref(null);
    const loading = ref(false);
    const error = ref("");
    const quantityList = ref([
      { value: "free", label: "Freely" },
      { value: "moderate", label: "In moderation" },
      { value: "rarely", label: "Rarely" },
      { value: "never", label: "Never" }
    ]);
    const getQuantityColor = (quantity) => {
      switch (quantity) {
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
    const getQuantityLabel = (quantityArray, searchValue) => {
      const item = quantityArray.find((q) => q.value === searchValue);
      return item ? item.label : "Unknown";
    };
    watch(selectedFood, async (newValue) => {
      if (newValue) {
        await fetchFoodDetails(newValue);
      } else {
        selectedFoodData.value = null;
      }
    });
    const fetchFoodDetails = async (foodId) => {
      loading.value = true;
      try {
        const response = await foods.getById(foodId);
        selectedFoodData.value = response.food;
      } catch (err) {
        error.value = `Failed to fetch food details: ${err.message}`;
        console.error("Error fetching food details:", err);
      } finally {
        loading.value = false;
      }
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(ssrRenderComponent(VCard, mergeProps({ style: {} }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(VCardTitle, { class: "text-h5" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Can they eat it? `);
                } else {
                  return [
                    createTextVNode(" Can they eat it? ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(VCardText, null, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(ssrRenderComponent(VAutocomplete, {
                    modelValue: unref(selectedFood),
                    "onUpdate:modelValue": ($event) => isRef(selectedFood) ? selectedFood.value = $event : null,
                    label: "Type to search",
                    placeholder: "Search for food",
                    clearable: "",
                    "hide-details": "",
                    variant: "solo-filled",
                    items: unref(foodItems),
                    "item-title": "name",
                    "item-value": "id",
                    loading: unref(loading)
                  }, null, _parent3, _scopeId2));
                  if (unref(selectedFoodData)) {
                    _push3(`<div class="mt-4"${_scopeId2}>`);
                    if (unref(loading)) {
                      _push3(ssrRenderComponent(VProgressLinear, {
                        indeterminate: "",
                        color: "primary",
                        class: "mb-2"
                      }, null, _parent3, _scopeId2));
                    } else {
                      _push3(`<!---->`);
                    }
                    _push3(ssrRenderComponent(VCard, null, {
                      default: withCtx((_3, _push4, _parent4, _scopeId3) => {
                        if (_push4) {
                          _push4(ssrRenderComponent(VCardTitle, { class: "text-h6" }, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(selectedFoodData).name)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(selectedFoodData).name), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardText, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(`${ssrInterpolate(unref(selectedFoodData).description)}`);
                              } else {
                                return [
                                  createTextVNode(toDisplayString(unref(selectedFoodData).description), 1)
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                          _push4(ssrRenderComponent(VCardActions, null, {
                            default: withCtx((_4, _push5, _parent5, _scopeId4) => {
                              if (_push5) {
                                _push5(ssrRenderComponent(VChip, {
                                  color: unref(selectedFoodData).can_eat ? "success" : "error",
                                  text: unref(selectedFoodData).can_eat ? "Safe to eat" : "Not recommended"
                                }, null, _parent5, _scopeId4));
                                _push5(ssrRenderComponent(VChip, {
                                  color: getQuantityColor(unref(selectedFoodData).quantity),
                                  text: getQuantityLabel(unref(quantityList), unref(selectedFoodData).quantity)
                                }, null, _parent5, _scopeId4));
                              } else {
                                return [
                                  createVNode(VChip, {
                                    color: unref(selectedFoodData).can_eat ? "success" : "error",
                                    text: unref(selectedFoodData).can_eat ? "Safe to eat" : "Not recommended"
                                  }, null, 8, ["color", "text"]),
                                  createVNode(VChip, {
                                    color: getQuantityColor(unref(selectedFoodData).quantity),
                                    text: getQuantityLabel(unref(quantityList), unref(selectedFoodData).quantity)
                                  }, null, 8, ["color", "text"])
                                ];
                              }
                            }),
                            _: 1
                          }, _parent4, _scopeId3));
                        } else {
                          return [
                            createVNode(VCardTitle, { class: "text-h6" }, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedFoodData).name), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VCardText, null, {
                              default: withCtx(() => [
                                createTextVNode(toDisplayString(unref(selectedFoodData).description), 1)
                              ]),
                              _: 1
                            }),
                            createVNode(VCardActions, null, {
                              default: withCtx(() => [
                                createVNode(VChip, {
                                  color: unref(selectedFoodData).can_eat ? "success" : "error",
                                  text: unref(selectedFoodData).can_eat ? "Safe to eat" : "Not recommended"
                                }, null, 8, ["color", "text"]),
                                createVNode(VChip, {
                                  color: getQuantityColor(unref(selectedFoodData).quantity),
                                  text: getQuantityLabel(unref(quantityList), unref(selectedFoodData).quantity)
                                }, null, 8, ["color", "text"])
                              ]),
                              _: 1
                            })
                          ];
                        }
                      }),
                      _: 1
                    }, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                  if (unref(error)) {
                    _push3(`<div class="mt-4"${_scopeId2}>`);
                    _push3(ssrRenderComponent(VAlert, {
                      type: "error",
                      text: unref(error)
                    }, null, _parent3, _scopeId2));
                    _push3(`</div>`);
                  } else {
                    _push3(`<!---->`);
                  }
                } else {
                  return [
                    createVNode(VAutocomplete, {
                      modelValue: unref(selectedFood),
                      "onUpdate:modelValue": ($event) => isRef(selectedFood) ? selectedFood.value = $event : null,
                      label: "Type to search",
                      placeholder: "Search for food",
                      clearable: "",
                      "hide-details": "",
                      variant: "solo-filled",
                      items: unref(foodItems),
                      "item-title": "name",
                      "item-value": "id",
                      loading: unref(loading)
                    }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"]),
                    unref(selectedFoodData) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "mt-4"
                    }, [
                      unref(loading) ? (openBlock(), createBlock(VProgressLinear, {
                        key: 0,
                        indeterminate: "",
                        color: "primary",
                        class: "mb-2"
                      })) : createCommentVNode("", true),
                      createVNode(VCard, null, {
                        default: withCtx(() => [
                          createVNode(VCardTitle, { class: "text-h6" }, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(selectedFoodData).name), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardText, null, {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(unref(selectedFoodData).description), 1)
                            ]),
                            _: 1
                          }),
                          createVNode(VCardActions, null, {
                            default: withCtx(() => [
                              createVNode(VChip, {
                                color: unref(selectedFoodData).can_eat ? "success" : "error",
                                text: unref(selectedFoodData).can_eat ? "Safe to eat" : "Not recommended"
                              }, null, 8, ["color", "text"]),
                              createVNode(VChip, {
                                color: getQuantityColor(unref(selectedFoodData).quantity),
                                text: getQuantityLabel(unref(quantityList), unref(selectedFoodData).quantity)
                              }, null, 8, ["color", "text"])
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ])) : createCommentVNode("", true),
                    unref(error) ? (openBlock(), createBlock("div", {
                      key: 1,
                      class: "mt-4"
                    }, [
                      createVNode(VAlert, {
                        type: "error",
                        text: unref(error)
                      }, null, 8, ["text"])
                    ])) : createCommentVNode("", true)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(VCardTitle, { class: "text-h5" }, {
                default: withCtx(() => [
                  createTextVNode(" Can they eat it? ")
                ]),
                _: 1
              }),
              createVNode(VCardText, null, {
                default: withCtx(() => [
                  createVNode(VAutocomplete, {
                    modelValue: unref(selectedFood),
                    "onUpdate:modelValue": ($event) => isRef(selectedFood) ? selectedFood.value = $event : null,
                    label: "Type to search",
                    placeholder: "Search for food",
                    clearable: "",
                    "hide-details": "",
                    variant: "solo-filled",
                    items: unref(foodItems),
                    "item-title": "name",
                    "item-value": "id",
                    loading: unref(loading)
                  }, null, 8, ["modelValue", "onUpdate:modelValue", "items", "loading"]),
                  unref(selectedFoodData) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "mt-4"
                  }, [
                    unref(loading) ? (openBlock(), createBlock(VProgressLinear, {
                      key: 0,
                      indeterminate: "",
                      color: "primary",
                      class: "mb-2"
                    })) : createCommentVNode("", true),
                    createVNode(VCard, null, {
                      default: withCtx(() => [
                        createVNode(VCardTitle, { class: "text-h6" }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(selectedFoodData).name), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VCardText, null, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(unref(selectedFoodData).description), 1)
                          ]),
                          _: 1
                        }),
                        createVNode(VCardActions, null, {
                          default: withCtx(() => [
                            createVNode(VChip, {
                              color: unref(selectedFoodData).can_eat ? "success" : "error",
                              text: unref(selectedFoodData).can_eat ? "Safe to eat" : "Not recommended"
                            }, null, 8, ["color", "text"]),
                            createVNode(VChip, {
                              color: getQuantityColor(unref(selectedFoodData).quantity),
                              text: getQuantityLabel(unref(quantityList), unref(selectedFoodData).quantity)
                            }, null, 8, ["color", "text"])
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ])) : createCommentVNode("", true),
                  unref(error) ? (openBlock(), createBlock("div", {
                    key: 1,
                    class: "mt-4"
                  }, [
                    createVNode(VAlert, {
                      type: "error",
                      text: unref(error)
                    }, null, 8, ["text"])
                  ])) : createCommentVNode("", true)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BnCcph2x.mjs.map

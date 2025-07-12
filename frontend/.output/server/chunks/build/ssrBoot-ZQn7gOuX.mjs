import { shallowRef, toRef, readonly } from 'vue';

function useSsrBoot() {
  const isBooted = shallowRef(false);
  const ssrBootStyles = toRef(() => !isBooted.value ? {
    transition: "none !important"
  } : void 0);
  return {
    ssrBootStyles,
    isBooted: readonly(isBooted)
  };
}

export { useSsrBoot as u };
//# sourceMappingURL=ssrBoot-ZQn7gOuX.mjs.map

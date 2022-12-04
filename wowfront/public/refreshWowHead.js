function refreshTooltip() {
  try {
    setTimeout(() => {
      if (typeof $WowheadPower == "undefined") {
        // eslint-disable-next-line no-undef
        $.getScript("//wow.zamimg.com/widgets/power.js");
      } else {
        // eslint-disable-next-line no-undef
        $WowheadPower.refreshLinks();
      }
    }, 10);
  } finally {
  }
}

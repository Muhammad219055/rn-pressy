# Changelog

All notable changes to the `rn-pressy` project will be documented in this file.

## [Unreleased]

### Added

- **Liquid Glass Effect** (iOS 26+): Added premium frosted glass effect support for `Pressy`, `Toggy`, and `DDown` components.
  - New props: `liquidGlass`, `liquidGlassInteractive`, `liquidGlassEffect`, `liquidGlassTintColor`.
  - Conditional rendering wrapper using `@callstack/liquid-glass`.
- **Swipe Reveal Variant** (`Pressy`): Added a new `swipeVariant="reveal"` mode where the success message is progressively revealed underneath the track as the user swipes.
  - Implemented using `translateX` animation for native driver compatibility.
  - Success text slides in from the left, creating a "wipe" reveal effect.
- **Animated Swipe Success**: Enhanced the default swipe completion with a sequence: thumb fade out → success message scale in → delay → success fade out → thumb reset.
- **Smooth Reveal-to-Press**: Improved `revealToPress` animation to use a crossfade between states, preventing size jumps and ensuring a smooth transition (200ms).
- **DDown Enhancements**:
  - **Seamless Dropdown**: Removed gap between button and dropdown, ensured proper z-indexing, and added adaptive border radius for a seamless "connected" look.
  - **Animation**: Added smooth fade animation without scale effects.
- **Shadow System**: Completely overhauled shadow rendering in `Pressy` to fix clipping issues with `overflow: 'hidden'` and added new presets (Small, Medium, Large).

### Changed

- **Swipe Logic**: Refactored `Pressy` pan responder handling for better gesture detection, velocity handling, and rubber-banding effect.
- **Documentation**: Updated `Pressy` and `DDown` READMEs with new GIFs, examples, and comprehensive prop tables. Added JSDoc comments throughout.
- **Code Quality**: Added comprehensive types and JSDoc headers.

### Fixed

- **Pressy**: Fixed layout issues in `revealToPress` mode by stacking content layers.
- **Pressy**: Fixed `width` animation issue in swipe reveal by switching to `translateX`.
- **Pressy Background**: Fixed issue where custom `backgroundColor` style prop was not applied correctly.
- **Shadow Clipping**: Fixed shadows being clipped by `overflow: 'hidden'` by moving providing shadows to an outer wrapper.

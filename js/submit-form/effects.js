const imgUpload = document.querySelector('.img-upload__overlay');
const effectListNode = imgUpload.querySelector('.effects__list');
const effectLevelNode = imgUpload.querySelector('.effect-level');
const effectSliderNode = effectLevelNode.querySelector('.effect-level__slider');
const effectValueNode = effectLevelNode.querySelector('.effect-level__value');
const submittedImageNode = imgUpload.querySelector('.img-upload__preview img');

const effects = {
  chrome: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    getCssFilter: (value) => `grayscale(${value})`
  },
  sepia: {
    MIN: 0,
    MAX: 1,
    STEP: 0.1,
    getCssFilter: (value) => `sepia(${value})`
  },
  marvin: {
    MIN: 0,
    MAX: 100,
    STEP: 1,
    getCssFilter: (value) => `invert(${value}%)`
  },
  phobos: {
    MIN: 0,
    MAX: 3,
    STEP: 0.1,
    getCssFilter: (value) => `blur(${value}px)`
  },
  heat: {
    MIN: 1,
    MAX: 3,
    STEP: 0.1,
    getCssFilter: (value) => `brightness(${value})`
  },
};

let activeEffect = 'none';

const getEffectOptions = (effectType) => {
  const { MIN, MAX, STEP } = effects[effectType];
  return {
    range: {
      min: MIN,
      max: MAX
    },
    connect: 'lower',
    start: MAX,
    step: STEP
  };
};

const removeEffect = () => {
  activeEffect = 'none';
  effectLevelNode.classList.add('hidden');
  submittedImageNode.style.filter = 'none';
  if (effectSliderNode.noUiSlider) {
    effectSliderNode.noUiSlider.destroy();
  }
};

const updateEffect = (effectType) => {
  if (effectType === 'none') {
    removeEffect();
    return;
  }

  const effectValue = effectSliderNode.noUiSlider.get();
  submittedImageNode.style.filter = effects[effectType].getCssFilter(effectValue);
  effectValueNode.value = effectValue;
  effectLevelNode.classList.toggle('hidden', effectType === 'none');
};

const onChangeEffect = (event) => {
  const effectNode = event.target.closest('.effects__radio');
  if (!effectNode) { return; }

  activeEffect = effectNode.value;
  if (effectSliderNode.noUiSlider) {
    effectSliderNode.noUiSlider.destroy();
  }

  if (activeEffect === 'none') {
    removeEffect();
    return;
  }

  noUiSlider.create(effectSliderNode, getEffectOptions(activeEffect));
  effectSliderNode.noUiSlider.on('slide.one', () => {
    updateEffect(activeEffect);
  });
  updateEffect(activeEffect);
};

const initEffects = () => {
  effectListNode.addEventListener('click', onChangeEffect);
};

export { initEffects, removeEffect };

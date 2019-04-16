import { getKey, KEY_VALUES } from 'utilities/event-helper/key-event'
describe('Key events', () => {
  const aKeycode = 65
  const plusKeycode = 43

  it('getKey() should return key directly if it exists', () => {
    const event = {
      key: KEY_VALUES.ARROW_LEFT
    }

    const result = getKey(event)

    expect(result).toBe(KEY_VALUES.ARROW_LEFT)
  })

  it('should return lower case letter', () => {
    const event = {
      which: aKeycode,
      getModifierState: () => false,
      shiftKey: false
    }
    const result = getKey(event)

    expect(result).toBe('a')
  })

  it('should return sign for other key code', () => {
    const event = {
      which: plusKeycode,
      getModifierState: () => false,
      shiftKey: false
    }
    const result = getKey(event)

    expect(result).toBe('+')
  })

  it.each([
    [true, false],
    [false, true],
    [true, true]
  ])(
    'should return upper case letter when capslock is %s and shift key is %s',
    (enableCapslock, enableShift) => {
      const event = {
        which: aKeycode,
        getModifierState: () => enableCapslock,
        shiftKey: enableShift
      }
      const result = getKey(event)

      expect(result).toBe('A')
    })
})

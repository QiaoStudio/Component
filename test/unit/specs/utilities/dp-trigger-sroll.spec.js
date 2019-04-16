import dpTriggerSroll from 'utilities/dp-trigger-sroll'

describe('utilities/dp-trigger-sroll', () => {
  it('dpTriggerSroll be used', () => {
    dpTriggerSroll.open()
    expect(window.document.body.className).toContain('dp-trigger-sroll')
    dpTriggerSroll.close()
    expect(window.document.body.className).not.toContain('dp-trigger-sroll')
  })
})

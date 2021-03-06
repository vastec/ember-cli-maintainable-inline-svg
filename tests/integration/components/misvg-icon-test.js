import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render, find } from '@ember/test-helpers';
import { htmlSafe } from '@ember/template';
import hbs from 'htmlbars-inline-precompile';
import Service from '@ember/service';

//Stub misvg-sprites service
const svgSpritesStub = Service.extend({
  init() {
    this._super(...arguments);
    this.sprites = {
      'notes': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 26 26">\n  <g class="notes-stroke" stroke="none" stroke-width="1" fill="none">\n    <circle class="notes-circle" cx="13" cy="13" r="12.5"/>\n    <g class="notes-pencil" transform="translate(6.500000, 6.500000)">\n      <path d="M12.3229167,3.78916992 L12.3229167,11.2395833 C12.3229167,12.2117734 11.5346901,13 10.5625,13 L1.76041667,13 C0.788226562,13 0,12.2117734 0,11.2395833 L0,2.4375 C0,1.4653099 0.788226562,0.677083333 1.76041667,0.677083333 L9.21038997,0.677083333 L7.45082601,2.4375 L1.76041667,2.4375 L1.76041667,11.2395833 L10.5625,11.2395833 L10.5625,5.55002669 L12.3229167,3.78916992 L12.3229167,3.78916992 Z M10.9716593,0.161336263 L10.3493245,0.783671061 L12.2163289,2.65111556 L12.8386637,2.02878076 L10.9716593,0.161336263 L10.9716593,0.161336263 Z M4.12597656,7.00875195 L5.99298096,8.87575635 L11.5939941,3.27386296 L9.72698975,1.40641846 L4.12597656,7.00875195 L4.12597656,7.00875195 Z M3.52083333,9.47916667 L5.28125,9.47916667 L3.52083333,7.71875 L3.52083333,9.47916667 L3.52083333,9.47916667 Z" id="Shape"/>\n    </g>\n  </g>\n</svg>',
      'plus': '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 66.915 66.915">\n  <path class="fill-2" d="M49.221,31.5h-14.5V17.881c0-1.104-0.896-2-2-2s-2,0.896-2,2V31.5h-13.5c-1.104,0-2,0.896-2,2s0.896,2,2,2h13.5v14.381c0,1.104,0.896,2,2,2s2-0.896,2-2V35.5h14.5c1.104,0,2-0.896,2-2S50.325,31.5,49.221,31.5z"/>\n  <path class="fill-1" d="M33.457,0C15.009,0,0,15.008,0,33.457s15.009,33.458,33.457,33.458c18.449,0,33.458-15.009,33.458-33.458C66.915,15.009,51.907,0,33.457,0z M33.457,62.915C17.215,62.915,4,49.7,4,33.457C4,17.215,17.215,4,33.457,4C49.7,4,62.915,17.214,62.915,33.457S49.7,62.915,33.457,62.915z"/>\n</svg>'
    };
  },

  getSprite(name) {
    return this.get('sprites')[name];
  },

  getSvgCode(spriteName) {
    return htmlSafe(this.getSprite(spriteName));
  }
});

module('Integration | Component | misvg-icon', function(hooks) {
  setupRenderingTest(hooks);

  hooks.beforeEach(function() {
    this.owner.register('service:misvg-sprites', svgSpritesStub);
  });

  test('it renders', async function(assert) {
    this.set('name', 'plus');

    await render(hbs`{{misvg-icon name=name width=100 height=100}}`);

    assert.equal(find('.misvg-icon').getAttribute('style'), 'width: 100px; height: 100px;', 'has proper style attr');
  });
});

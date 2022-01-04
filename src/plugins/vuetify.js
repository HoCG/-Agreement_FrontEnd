import Vue from 'vue';
import Vuetify from 'vuetify/lib/framework';
import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify);

export default new Vuetify({
    theme: {
        themes: {
          light: {
            BtnColor1: colors.purple.lighten3,
            BtnColor2: colors.cyan.lighten4
          }
        }
    }
});

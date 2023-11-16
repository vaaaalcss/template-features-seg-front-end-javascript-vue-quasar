import { boot } from 'quasar/wrappers'
import Vidle from 'v-idle-3'

export default boot(async ( { app } ) => {
	app.use( Vidle );
});

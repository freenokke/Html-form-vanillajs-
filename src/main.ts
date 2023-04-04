import './style.css'
import { Form } from './components/form';

const appContainer = document.querySelector<HTMLDivElement>('#app');
const form = new Form(appContainer)
form.init();

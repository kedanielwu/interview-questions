import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// to avoid seeing typography warnings, since we don't load the theme in tests;
window.__MUI_USE_NEXT_TYPOGRAPHY_VARIANTS__ = true;

configure({ adapter: new Adapter() });
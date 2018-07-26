import $ from 'jquery';
import App from './App';
import '../sass/style.scss';

$(() => {
  $('body').append(App('World'));
});

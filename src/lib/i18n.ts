import { register, init, getLocaleFromNavigator } from 'svelte-i18n';

register('de', () => import('../locales/de.json'));
register('en', () => import('../locales/en.json'));
register('eo', () => import('../locales/eo.json'));
register('es', () => import('../locales/es.json'));
register('fr', () => import('../locales/fr.json'));
register('it', () => import('../locales/it.json'));
register('jp', () => import('../locales/jp.json'));
register('ko', () => import('../locales/ko.json'));
register('pl', () => import('../locales/pl.json'));
register('ru', () => import('../locales/ru.json'));
register('uk', () => import('../locales/uk.json'));
register('zh', () => import('../locales/zh.json'));

init({
    fallbackLocale: 'en',
    initialLocale: getLocaleFromNavigator()
});

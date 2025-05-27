<script lang="ts">
	import { fly } from 'svelte/transition';

    let { interval }: { interval: number } = $props();

    const translations = [
        { lang: 'en', text: 'Learn languages by reading what matters to you.' },
        { lang: 'it', text: 'Impara le lingue leggendo ciò che conta per te.' },
        { lang: 'uk', text: 'Вивчайте мови, читаючи те, що вам важливо.' },
        { lang: 'jp', text: '自分にとって大切なことを読みながら言語を学びましょう。' },
        { lang: 'fr', text: 'Apprenez les langues en lisant ce qui compte pour vous.' },
        { lang: 'zh', text: '通过阅读对你重要的内容来学习语言。' },
        { lang: 'eo', text: 'Lernu lingvojn legante tion, kio gravas por vi.' },
        { lang: 'ko', text: '중요한 내용을 읽으며 언어를 배우세요.' },
        { lang: 'de', text: 'Lerne Sprachen, indem du liest, was dir wichtig ist.' },
        { lang: 'ru', text: 'Изучайте языки, читая то, что важно для вас.' },
        { lang: 'pl', text: 'Ucz się języków, czytając to, co dla ciebie ważne.' },
        { lang: 'es', text: 'Aprende idiomas leyendo lo que te importa.' }
    ];

    let index = $state(0);
    let tagline = $derived(translations[index].text);

    // Set up rotation animation
    $effect(() => {
        const id = setInterval(() => {
            index = (index + 1) % translations.length;
        }, interval);
        return () => clearInterval(id);
    });
</script>


<div class="relative h-[4em] overflow-hidden text-center text-lg font-medium opacity-60">
	{#key tagline}
		<div
			transition:fly={{ x: 100, duration: 200 }}
			class="absolute w-full"
		>
			{tagline}
		</div>
	{/key}
</div>
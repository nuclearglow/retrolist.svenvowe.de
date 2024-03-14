<script lang="ts">
	import { currentSubtitle, currentTitle } from '$lib/stores';
</script>

<header>
	<a href="/">
		<div class="wrapper">
			<div class="title" data-title={$currentTitle}>
				{$currentTitle}
				<div class="subtitle">{$currentSubtitle}</div>
			</div>
		</div>
	</a>
</header>

<style lang="scss">
	header {
		grid-area: header;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		height: var(--header-height);

		display: flex;
		align-items: center;
		justify-content: center;

		background-color: var(--background-color);

		&::after {
			content: '';
			position: absolute;
			top: var(--header-height);
			box-shadow: 0 0 32px 16px var(--background-color);
			clip-path: inset(0 0 -32px 0);
			width: 100%;
		}

		z-index: 1000;

		.wrapper {
			position: relative;

			.title {
				text-transform: uppercase;
				background-image: linear-gradient(
					#378dbc 0%,
					#b6e8f1 46%,
					#ffffff 50%,
					#32120e 54%,
					#ffc488 58%,
					#582c11 90%,
					#ec9b4e 100%
				);
				color: transparent;
				-webkit-background-clip: text;
				background-clip: text;

				-webkit-text-fill-color: transparent;
				-webkit-text-stroke: 2px #f5f5f5;

				font-family: 'Titillium Web', sans-serif;
				font-size: calc(var(--global-scale-factor) * 100px);
				font-weight: 900;
				font-style: oblique;
				line-height: 1;
				padding-right: calc(var(--global-scale-factor) * 20px);

				&:before {
					content: attr(data-title);
					position: absolute;
					left: 0;
					top: 0;
					padding-right: calc(var(--global-scale-factor) * 150px);

					z-index: 10;

					background-image: -webkit-linear-gradient(
						-40deg,
						transparent 0%,
						transparent 40%,
						#fff 50%,
						transparent 60%,
						transparent 100%
					);
					background-position: calc(var(--global-scale-factor) * -340px) 0;
					background-clip: text;
					-webkit-background-clip: text;
					-webkit-text-stroke: 0;

					animation-name: chrome-effect;
					-webkit-animation-name: chrome-effect;
					animation-duration: 10s;
					-webkit-animation-duration: 10s;
					animation-delay: 10s;
					-webkit-animation-delay: 10s;
					animation-timing-function: linear;
					-webkit-animation-timing-function: linear;
					animation-iteration-count: infinite;
					-webkit-animation-iteration-count: infinite;
				}

				.subtitle {
					position: absolute;
					top: calc(var(--global-scale-factor) * 50px);
					right: calc(var(--global-scale-factor) * -30px);

					font-family: 'Mr Dafoe', cursive;
					font-weight: 200;
					font-size: calc(var(--global-scale-factor) * 80px);
					text-transform: none;
					&::first-letter {
						text-transform: uppercase;
					}

					color: var(--subtitle-color);
					-webkit-text-fill-color: var(--subtitle-color);

					transform: rotate(-15deg);
					-webkit-transform: rotate(-15deg); /* Safari and Chrome */
					-webkit-text-stroke: 1px #f008b7;
					-webkit-filter: drop-shadow(1px 1px calc(var(--global-scale-factor) * 10px) #f008b7);
					filter: drop-shadow(1px 1px calc(var(--global-scale-factor) * 10px) #f008b7);
					z-index: 20;
				}
			}
		}
	}
</style>

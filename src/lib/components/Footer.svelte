<footer>
	<div class="left">
		Left
		<!-- TODO: back button-->
		<!-- TODO: profile-->
		<!-- TODO: imprint-->
	</div>
	<div class="right">
		Right
		<!-- TODO: back button-->
	</div>
</footer>

<style lang="scss">
	footer {
		grid-area: footer;
		min-height: 60px;

		&,
		.left {
			display: flex;
			align-items: center;
			justify-content: flex-start;
		}

		.left {
			min-width: 120px;
		}

		.right {
			text-align: right;
		}
	}
</style>
<script>
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
</script>

<div class="flex items-center justify-center h-screen">
	<div class="grid grid-cols-2 gap-4">
		<div class="flex flex-col m-auto">
			<div class="font-bold text-6xl m-auto">Diety⚡</div>
            <Separator class="my-4" />
			<div class="ml-2 m-auto">Your AI-Powered food diary!</div>
		</div>
		<div class="m-auto">
			<Card.Root class="w-80">
				<Card.Header>
					<Card.Title>Sign in / Sign Up</Card.Title>
				</Card.Header>
				<Card.Content>
					<a href="/login">
						<Button class="w-full">Sign in</Button>
					</a>
					<Separator class="my-4" />
					<a href="/signup">
						<Button variant="outline" class="w-full">Sign Up</Button>
					</a>
				</Card.Content>
			</Card.Root>
		</div>
	</div>
</div>

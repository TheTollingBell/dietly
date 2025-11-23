<script lang="ts">
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import logo from '$lib/assets/logo.png';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Separator } from '$lib/components/ui/separator/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { redirect } from '@sveltejs/kit';
	import { enhance } from '$app/forms';
	import type { PageProps } from './$types';

	const usernameRegex = /^[a-zA-Z0-9_]{1,32}$/;

	function handleSignup({ formElement, formData, action, cancel, submitter }) {
	}
</script>

<div class="flex flex-col items-center justify-center h-screen">
	<a href="/">
		<Avatar.Root class="w-64 h-64 m-auto mb-0 mt-16">
			<Avatar.Image src={logo} alt="Diety" />
			<Avatar.Fallback>D</Avatar.Fallback>
		</Avatar.Root>
	</a>
	<div class="m-auto mt-0">
		<Card.Root class="w-80">
			<Card.Header>
				<Card.Title>Sign up</Card.Title>
			</Card.Header>
			<Card.Content>
				<form method="POST" use:enhance={({ formElement, formData, action, cancel, submitter }) => {
					console.log(formData)
					const username = formData.get("username");
					const password = formData.get("password");
						if (username.length === 0 || password.length === 0) {
							alert('Please fill in both username and password.');
							cancel();
							return;
						}

						if (username.length > 32) {
							alert('Username must be less than 32 or equal to characters.');
							cancel();
							return;
						}

						if (!usernameRegex.test(username)) {
							alert('Username can only contain letters, numbers, and underscores.');
							cancel();
							return;
						}
					}}>
					<Input id="username" type="text" placeholder="Username" class="mb-4 w-full" />
					<Input id="password" type="password" placeholder="Password" class="mb-4 w-full" />
					<Separator class="my-4" />
					<Button class="w-full"><button>Sign up</button></Button>
				</form>
			</Card.Content>
		</Card.Root>
	</div>
</div>

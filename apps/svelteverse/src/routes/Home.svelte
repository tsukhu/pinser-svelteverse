<script lang="ts">
  import { onDestroy, onMount } from 'svelte';
  import { replace } from 'svelte-spa-router';
  let username;
  let loading = false;
  let state: 'login' | 'avatar' | 'preview' = 'login';
  onMount(() => {
    if (localStorage.getItem('username')) {
      if (!localStorage.getItem('avatar')) state = 'avatar';
      else state = 'preview';
    }
    window.addEventListener('message', subscribe);
    document.addEventListener('message', subscribe);
  });

  onDestroy(() => {
    window.removeEventListener('message', subscribe);
    document.removeEventListener('message', subscribe);
  });

  function parse(event) {
    try {
      return JSON.parse(event.data);
    } catch (error) {
      return null;
    }
  }

  function subscribe(event) {
    const json = parse(event);

    if (json?.source !== 'readyplayerme') {
      return;
    }

    // Susbribe to all events sent from Ready Player Me once frame is ready
    if (json.eventName === 'v1.frame.ready') {
      const frame: any = document.getElementById('frame');
      console.log(frame);
      if (frame) {
        frame.contentWindow.postMessage(
          JSON.stringify({
            target: 'readyplayerme',
            type: 'subscribe',
            eventName: 'v1.**',
          }),
          '*'
        );
      }
    }

    // Get avatar GLB URL
    if (json.eventName === 'v1.avatar.exported') {
      console.log(`Avatar URL: ${json.data.url}`);
      localStorage.setItem('avatar', json.data.url);
      state = 'preview';
    }

    // Get user id
    if (json.eventName === 'v1.user.set') {
      console.log(`User with id ${json.data.id} set: ${JSON.stringify(json)}`);
    }
  }

  function validate() {
    localStorage.setItem('username', username);
    state = 'avatar';
  }

  async function getPreview() {
    loading = true;
    if (!localStorage.getItem('preview')) {
      const response = await fetch('https://render.readyplayer.me/render', {
        method: 'POST',
        body: JSON.stringify({
          model: localStorage.getItem('avatar'),
          scene: 'halfbody-portrait-v1',
        }),
      });

      const { renders } = await response.json();
      localStorage.setItem('preview', renders[0]);
    }
    loading = false;
    replace('/metaverse');
  }

  $: if (state === 'preview') getPreview();
</script>

<div class="py-6 sm:px-6 lg:px-8 flex w-full h-full">
  {#if state === 'login'}
    <form on:submit|preventDefault={validate}>
      <div class="py-12">
        <h2 class="text-2xl font-bold">Welcome to Pinser Metaverse!</h2>
        <h4 class="text-1xl">Please login</h4>
        <div class="mt-8 max-w-md">
          <div class="grid grid-cols-1 gap-6">
            <label class="block">
              <span class="text-gray-700 font-semibold">User Name</span>
              <input
                type="text"
                class="
                  mt-1
                  block
                  w-full
                  rounded-md
                  border-gray-300
                  shadow-sm
                  focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50
                "
                placeholder=""
                bind:value={username}
              />
            </label>
          </div>
        </div>
      </div>
      <button type="submit" class="btn btn-primary uppercase">Submit</button>
    </form>
  {:else if state === 'avatar'}
    <div class="w-full h-full ">
      <iframe
        id="frame"
        class="w-full h-full"
        title="Ready Player Me Avatar"
        src="https://pinser.readyplayer.me/avatar?frameApi&bodyType=halfbody&hands=false"
        allow="camera *; microphone *; clipboard-write"
      />
    </div>
  {:else if loading}
    <div aria-label="Loading..." role="status">
      <svg class="h-6 w-6 animate-spin" viewBox="3 3 18 18"
        ><path
          class="fill-gray-200"
          d="M12 5C8.13401 5 5 8.13401 5 12c0 3.866 3.13401 7 7 7 3.866.0 7-3.134 7-7 0-3.86599-3.134-7-7-7zM3 12c0-4.97056 4.02944-9 9-9 4.9706.0 9 4.02944 9 9 0 4.9706-4.0294 9-9 9-4.97056.0-9-4.0294-9-9z"
        /><path
          class="fill-gray-800"
          d="M16.9497 7.05015c-2.7336-2.73367-7.16578-2.73367-9.89945.0-.39052.39052-1.02369.39052-1.41421.0-.39053-.39053-.39053-1.02369.0-1.41422 3.51472-3.51472 9.21316-3.51472 12.72796.0C18.7545 6.02646 18.7545 6.65962 18.364 7.05015c-.390599999999999.39052-1.0237.39052-1.4143.0z"
        /></svg
      >
    </div>
  {/if}
</div>

<script lang="ts">
  // import Greet from './lib/Greet.svelte'
  import { invoke } from '@tauri-apps/api'

  let response;

  const handleResponse = async () => {
    console.log('clicked')
    response = await invoke('run_nmap', {ip: "196.168.4.0-255"})
  }

  $: r = response;
</script>

<main class="container">
  <h1>Welcome to Tauri!</h1>

  <button on:click={handleResponse}>run nmap</button>
  <p>{r}</p>
</main>

<style>
</style>
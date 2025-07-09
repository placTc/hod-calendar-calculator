<script lang="ts">
  import { Calendar, LawfulCalendar, UniversalCalendar, VerasCalendar } from "./Calendar"
    import {type Era} from "./Era";
    import {fade, scale, slide} from 'svelte/transition';

  let year = $state(0);

  let calendars = [
    new UniversalCalendar(), new VerasCalendar(), new LawfulCalendar()
  ]
  let selectedFromCalendar: Calendar = $state(calendars[0]);
  let selectedEra: Era = $state(calendars[0].eras[0])
  let eras: Array<Era> = $state(calendars[0].eras)
  const updateEras = () => {
    eras = selectedFromCalendar.eras
    selectedEra = selectedFromCalendar.eras[0]
  }

  const updateEra = () => {
    console.log(selectedFromCalendar)
    console.log(eras)
    selectedEra = eras[0]
    console.log(selectedEra)
    console.log("era")
  }

  let display: String | undefined = $state()

  let selectedCalendar: Calendar = $state(calendars[0]);

  const updateYear = () => {
    let trueYear = selectedFromCalendar.toYear({year: year, era: selectedEra});
    let yearEra = selectedCalendar.fromYear(trueYear);
    if ((year > selectedEra.duration && selectedEra.duration != 0)|| yearEra.year < yearEra.era.offset) {
      display = "Invalid year";
    } else {
      display = `The year is ${yearEra.year} ${yearEra.era?.name}`;
    }
  }
</script>

<div class="card">
  <div class="year input">
    <p>Year</p>
    <input id="convert-from" type="number" onchange={updateYear} bind:value={year} max={selectedEra.duration ? selectedEra.duration : Number.MAX_VALUE} min={selectedEra.offset}>
  </div>
  
  <div class="from-calendar input">
    From Calendar
    <select bind:value={selectedFromCalendar} onchange={updateEras}>
      {#each calendars as value}
      <option value={value}>{value.toString()}</option>
      {/each}
    </select>
  </div>
  
  {#if eras.length > 1}
  <div class="eras input" transition:slide={{duration: 200}}>
    Era
    <select bind:value={selectedEra}>
      {#each eras as value}
      <option value={value}>{value.name}</option>
      {/each}
    </select>
  </div>
  {/if}
  
  <div class="to-calendar input">
    To Calendar
    <select bind:value={selectedCalendar}>
      {#each calendars as value}
      <option value={value}>{value.toString()}</option>
      {/each}
    </select>
  </div>
  
  <div class="calculate input">
    <button onclick={updateYear}>Calculate</button>
  </div>
  
  <div class="display">
    {#if display}
      <p transition:slide={{duration: 200}}>{display}</p>
    {/if}
  </div>
</div>  

<script lang="ts">
  import { Calendar, LawfulCalendar, UniversalCalendar, VerasCalendar } from "./Calendar"
    import type {YearEra} from "./YearEra";
    import {EraEnum, makeEra, type Era} from "./Era";

  let year = $state(0);

  let calendars = [
    new UniversalCalendar(), new VerasCalendar(), new LawfulCalendar()
  ]
  let selectedFromCalendar: Calendar = $state(calendars[0]);
  let selectedEra: Era = $state(calendars[0].eras[0])
  let eras: Array<Era> = $state(calendars[0].eras)
  const updateEras = () => {
    if (selectedFromCalendar.eras.length > 1) {
      eras = selectedFromCalendar.eras
    } else {
      eras = []
      selectedEra = selectedFromCalendar.eras[0]
    }

    updateEra()
  }

  const updateEra = () => {
    selectedEra = eras[0]
  }

  let display: String | undefined = $state()

  let selectedCalendar: Calendar = $state(calendars[0]);

  const updateYear = () => {
    let trueYear = selectedFromCalendar.toYear({year: year, era: selectedEra});
    let yearEra = selectedCalendar.fromYear(trueYear);
    if ((year > selectedEra.length && selectedEra.length != 0)|| yearEra.year < 0) {
      display = "Invalid year";
      return;
    }
    display = `The year is ${yearEra.year} ${yearEra.era.name}`;
  }
</script>

<div class="year">
  <p>Year</p>
  <input id="convert-from" type="number" onchange={updateYear} bind:value={year} max={selectedEra.length ? selectedEra.length : Number.MAX_VALUE } min=0>
</div>

<div class="from-calendar">
  From Calendar
  <select bind:value={selectedFromCalendar} onchange={updateEras}>
    {#each calendars as value}
    <option value={value}>{value.toString()}</option>
    {/each}
  </select>
</div>

<div class="eras">
  {#if eras && eras.length > 1}
  Era
  <select bind:value={selectedEra}>
    {#each eras as value}
    <option value={value}>{value.name}</option>
    {/each}
  </select>
  {/if}
</div>

<div class="to-calendar">
  To Calendar
  <select bind:value={selectedCalendar}>
    {#each calendars as value}
    <option value={value}>{value.toString()}</option>
    {/each}
  </select>
</div>

<div class="calculate">
  <button onclick={updateYear}>calculate</button>
</div>

<div class="display">
  {#if display}
    <p>{display}</p>
  {/if}
</div>


<script lang="ts" name="GiftList">
import type { Gift, GiftTier} from "../types/gifTypes.ts";
import {GIFT_TIERS} from "../types/gifTypes.ts";
import {ref, withDefaults, computed} from "vue";

interface Props {
    gifts: Gift[];
    selectedTier?: GiftTier;
}

const props = withDefaults(defineProps<Props>(),{
    selectedTier: 'bronze'
});

const emits = defineEmits<{
    select: [gift:Gift];
    tierChange: [tier:GiftTier];
}>();

const loading = ref(false);

const filteredGifts= computed(()=>{
    const price = GIFT_TIERS[props.selectedTier];
    return props.gifts.filter(gift => gift.price <= price);
})

const selectGift = (gift:Gift) => {
    loading.value = true;
    emits('select', gift);
    setTimeout(()=>{
        loading.value = false;
    }, 500);
}

</script>
<style scoped>

</style>

<template>
<div></div>
</template>
export async function changePlan({
    subscriptionId,
    newPlanId
}) {
    return razorpay.subscriptions.update(subscriptionId, {
        plan_id: newPlanId,
        schedule_change_at: 'cycle_end'
    });
}
import type { SelectOrgWithStore } from '$lib/server/db/contracts';

class OrgState {
	list = $state<SelectOrgWithStore[]>([]);

	set(data: SelectOrgWithStore[]) {
		this.list = data;
	}
}

const orgState = new OrgState();

export default orgState;

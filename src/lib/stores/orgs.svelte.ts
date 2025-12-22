import type { Orgs } from '$lib/server/contracts';

class OrgState {
	list = $state<Orgs>([]);

	set(data: Orgs) {
		this.list = data;
	}
}

const orgState = new OrgState();

export default orgState;

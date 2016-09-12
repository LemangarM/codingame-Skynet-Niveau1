var inputs = readline().split(' ');
var	N = parseInt(inputs[0], 10);
var	L = parseInt(inputs[1], 10);
var	E = parseInt(inputs[2], 10);

// recover all links in one object
var links_nodes = new Object();
for (var i = 0; i < N; ++i)
{
	links_nodes[i] = [];
}
for (i = 0; i < L; ++i)
{
	inputs = readline().split(' ');
	var N1 = parseInt(inputs[0]); // N1 and N2 defines a link between these nodes
	var	N2 = parseInt(inputs[1]);
	links_nodes[N1].push(N2);
	links_nodes[N2].push(N1);
}
printErr("links_nodes :" + JSON.stringify(links_nodes));

// recover all gateways in one array
var gateways = [];
for (i = 0; i < E; ++i)
{
	var EI = readline();
	gateways.push(EI);
}

while (true)
{
	var SI = parseInt(readline()); // The index of the node on which the Skynet agent is positioned this turn
	var res = FindLinkToSever(links_nodes, gateways, SI);
	print(res.C1 + " " + res.C2);
}

// function to find link to sever
function FindLinkToSever(links_nodes, gateways, SI)
{
	var res = new Object();
	var linkIndex;
	for (var i = 0; i < gateways.length; i++)
	{
		var gateway = gateways[i],
			gateway_links = links_nodes[gateway];

		for (var j = 0; j < gateway_links.length; j++)
		{
			var node = gateway_links[j];

			res.C1 = gateway;
			res.C2 = node;
			linkIndex = j;

			if (node == SI) // Skynet agent near the gateway
			{
				break;
			}
		}
	}
	return res;
}

import dns from "dns";

const resolver = dns.promises;

async function run() {
  try {
    console.log("System DNS servers:", dns.getServers());
    const srv = await resolver.resolveSrv(
      "_mongodb._tcp.cluster0.mr14t.mongodb.net",
    );
    console.log("SRV records:", srv);
  } catch (err) {
    console.error("resolveSrv error:");
    console.error(err);
    process.exit(1);
  }
}

run();

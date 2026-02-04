const dns = require("dns");

console.log("System DNS servers:", dns.getServers());

dns.resolveSrv("_mongodb._tcp.cluster0.mr14t.mongodb.net", (err, records) => {
  if (err) {
    console.error("resolveSrv error:");
    console.error(err);
    process.exit(1);
  }
  console.log("SRV records:", records);
  process.exit(0); 
});

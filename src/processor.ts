import { TypeormDatabase } from '@subsquid/typeorm-store';
import {EvmBatchProcessor} from '@subsquid/evm-processor'
import { lookupArchive } from '@subsquid/archive-registry'
import { Member } from './model';
import { events } from './abi/lens-voting';

const contractAddress = "0xD3596C81FcAb699192dc79C8e25f1362E3dFf89A"

const processor = new EvmBatchProcessor()
  .setDataSource({
    chain: process.env.RPC_ENDPOINT,

    // Change the Archive endpoints for run the squid 
    // against the other EVM networks
    // For a full list of supported networks and config options
    // see https://docs.subsquid.io/develop-a-squid/evm-processor/configuration/

    archive: lookupArchive('polygon'),
  })
  .addLog(contractAddress, {
    filter: [[
      events.FollowNFTDelegatedPowerChanged.topic,
    ]],
    data: {
      evmLog: {
        topics: true,
        data: true,
      },
      transaction: {
        input: true
      }
    }
  }
  );


processor.run(new TypeormDatabase(), async (ctx) => {
  const members: Member[] = []
  for (let c of ctx.blocks) {
    for (let i of c.items) {
      // decode and normalize the tx data
      
    }
   }
   // apply vectorized transformations and aggregations
   

   // upsert batches of entities with batch-optimized ctx.store.save
   
});


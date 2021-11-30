# PhyRPPL: Phylogenetic library for RootPPL

## Changelog

### v0.5.3
Various small changes, mostly improvements to the script tools.

### v0.5.2
- can handle segfaults with runppl.sh

### v0.5.1
- improved final sampling
- some tests that lead to discovery of a bug in NomalInverseGammaNormal sampler
- posterior plotting in R improved
- runner script

### v0.5.0

- Major bug found, which affected AnaDS1 (not being executed).
- AnaDS-GBM implemented
- Improvements to tools.

### v0.4.0

Introduced templates to handle input.

### v.0.3.1

Merged CRBD update needed to get same log Z in the CorePPL-TreePPL paper.

### v.0.3.0

- Integrated new RootPPL syntax in CombineDS using NEXT
- ANADS - const nu
- conditionOnDetection and posterior sampling to CombineDS

## Getting started

Use `rootppl` to compile an example

   rootppl examples/CombineDS.cu
   
Use `program` to run the executable

   ./program
   
For more details see the `miking-dppl/rootppl`.

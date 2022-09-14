# PhyRPPL: Phylogenetic library for RootPPL

## Changelog

### v0.7.2
Included the bird supetree as a possible dataset

### v0.7.1
Framework supports the rare large shift model now.

### v0.7.0
Major update - CombinDS can now run on CUDA as recursion is replaced by iteration.

  - Keep the old version of CombineDS that uses recursion just in case.
  - Ignore vscode hidden directories.
  - simBranch now avoids recursion
  - replaces goesUndetected recursion with iteration

### v 0.6.5
  - Added posterior sampling
  - Adapted to new rootppl build system

### v.0.6.4

  - Improved Python program for posterior analysis includes median, etc.
  - New framework for running, which supports better statistics and cluster features.
  - Newer version of logz plot.
  - Safety improvements to avoid very rare assert (v > 0) error
  - Minimum number must be hardcoded, library function application not possible in CUDA.

### v0.6.2

- Toolchain improvements.

### v0.6.1

- Fixed bugs in the GBM model

### v0.6.0

- Geometric Brownian motion added.
- This versions works with the new distributions from `phyrppl` after LinearNormalInverseGammaNormal was implemented.

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

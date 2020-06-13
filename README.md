# Stack
- Frontend: ts + vue?
- Parser: ts + puppeter + faas? + redis
- DB: postgres for data + mongo for sites and markup


Пусть Data - стартовый набор данных (массив сайтов)
Есть несколько функций:
- A - забирает Data из базы
- B - получает данные и обрабатывает их
- C - получает данные и нормализует их
- D - получает данные и кладет их в базу

Под каждую из функций A-D создается docker image через скрипт?
Под каждую из функций A-D создается кластер через kind на KVM и подгружается image
Под каждую из функций A-D создается кластер через kind на KVM и подгружается image


kind example config:
```
  # this config file contains all config fields with comments
  # NOTE: this is not a particularly useful config file
  kind: Cluster
  apiVersion: kind.x-k8s.io/v1alpha4
  # patch the generated kubeadm config with some extra settings
  kubeadmConfigPatches:
  - |
    apiVersion: kubelet.config.k8s.io/v1beta1
    kind: KubeletConfiguration
    evictionHard:
      nodefs.available: "0%"
  # patch it further using a JSON 6902 patch
  kubeadmConfigPatchesJSON6902:
  - group: kubeadm.k8s.io
    version: v1beta2
    kind: ClusterConfiguration
    patch: |
      - op: add
        path: /apiServer/certSANs/-
        value: my-hostname
  # 1 control plane node and 3 workers
  nodes:
  # the control plane node config
  - role: control-plane
  # the three workers
  - role: worker
  - role: worker
  - role: worker
```

docker build --tag A:npm_vesion /path/to/A/Dockerfile
kind create cluster --config kind-config.yaml --name clus_A --image A:npm_version
kubectl apply -f clus_A_kubectl_config:npm_version

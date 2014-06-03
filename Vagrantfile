# -*- mode: ruby -*-
# vi: set ft=ruby :

Vagrant::Config.run do |config|

  config.vm.define "dev" do |dev|
    # dev.vm.box = "precise64"
    # dev.vm.box_url = "http://files.vagrantup.com/precise64.box"

    ### Get custom box with most updates already installed ###
    dev.vm.box = "precise64-custom"
    dev.vm.box_url = "http://labs.ecotrust.org/vagrant_boxes/precise64-custom.box"

    dev.vm.customize ["modifyvm", :id, "--memory", 1024, "--cpus", 2]

    # ssh defaults to 2222
    dev.vm.forward_port 80, 8080
    dev.vm.forward_port 8000, 8000
    dev.vm.share_folder "v-app", "/usr/local/apps/locus", "./"
  end
  
  # config.vm.box = "precise64"

  # config.vm.box_url = "http://files.vagrantup.com/precise64.box"

  # config.vm.forward_port 22, 2224
  # config.vm.forward_port 80, 8084
  # config.vm.forward_port 8000, 8004
  # config.vm.forward_port 5432, 5434

  # config.vm.share_folder "v-app", "/usr/local/apps/locus", "./"

  # config.vm.provision :puppet do |puppet|
  #  puppet.manifests_path = "scripts/puppet/manifests"
  #  puppet.manifest_file  = "locus.pp"
  #  puppet.module_path = "scripts/puppet/modules"
  #  puppet.options = ["--templatedir","/vagrant/scripts/puppet/manifests/files"]
  # end


  # The stage server will NOT have a shared folder 
  # so we can test git deploys, etc that dont apply to the local dev box
  #config.vm.define "stage" do |stage|
  #  stage.vm.box = "precise64"
  #  stage.vm.box_url = "http://files.vagrantup.com/precise64.box"
  #  #stage.customize ["modifyvm", :id, "--cpus", 2]
  #  #stage.customize ["modifyvm", :id, "--memory", 768]
  #  stage.vm"virtualbox" do |v|
  #      v.customize[
  #          'modifyvm', :id,
  #          '--name', node[:hostname],
  #          "--memory", 768,
  #          "--cpus", 2
  #        ]
  #  end
  #  stage.vm.forward_port 80, 9080
  #  stage.vm.forward_port 8000, 9000
  #  # no shared folder
  #end

  # deployment done directly with ansible, see deploy/*.sh
end

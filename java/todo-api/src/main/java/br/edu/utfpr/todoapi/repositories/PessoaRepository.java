package br.edu.utfpr.todoapi.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import br.edu.utfpr.todoapi.model.Pessoa;

public interface PessoaRepository 
    extends JpaRepository<Pessoa, UUID> {
        
    
}
